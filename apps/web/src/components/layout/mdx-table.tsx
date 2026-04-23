'use client';

import React from 'react';

interface MdxTableProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'minimal' | 'bordered';
  responsive?: boolean;
  striped?: boolean;
}

export function MdxTable({
  children,
  className = '',
  variant = 'default',
  responsive = true,
  striped = false,
}: MdxTableProps) {
  const extractTextFromChildren = (children: React.ReactNode): string => {
    if (typeof children === 'string') {
      return children;
    }
    if (typeof children === 'number') {
      return children.toString();
    }
    if (React.isValidElement(children)) {
      return extractTextFromChildren((children.props as { children?: React.ReactNode }).children);
    }
    if (Array.isArray(children)) {
      return children.map(extractTextFromChildren).join('');
    }
    return '';
  };

  // Enhanced markdown table detection and parsing
  const parseMarkdownTable = (markdown: string) => {
    // Clean and normalize the input
    const normalizedText = markdown
      .replace(/\r\n/g, '\n') // Normalize line endings
      .replace(/\r/g, '\n')
      .trim();

    if (!normalizedText) return { headers: [], rows: [], alignments: [] };

    const lines = normalizedText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const tableLines = lines.filter(line => {
      return line.includes('|') && /[^\s\-|]/.test(line);
    });

    if (tableLines.length < 2) return { headers: [], rows: [], alignments: [] };

    let separatorIndex = -1;
    let headerLine = '';

    for (let i = 0; i < tableLines.length; i++) {
      const line = tableLines[i];
      if (/^[\s\-:|]+$/.test(line) && line.includes('-')) {
        separatorIndex = i;
        if (i > 0) {
          headerLine = tableLines[i - 1];
        }
        break;
      }
    }

    if (separatorIndex === -1 || !headerLine) {
      const potentialHeaders = tableLines.filter(
        line => line.split('|').length > 2 && !line.match(/^\s*\|[\s\-:|]*\|\s*$/)
      );

      if (potentialHeaders.length === 0) return { headers: [], rows: [], alignments: [] };

      headerLine = potentialHeaders[0];
      separatorIndex = tableLines.indexOf(headerLine);
    }

    const parseTableRow = (line: string): string[] => {
      const cleaned = line.replace(/^\s*\|/, '').replace(/\|\s*$/, '');
      return cleaned
        .split('|')
        .map(cell => cell.trim())
        .filter((cell, index, arr) => {
          return index < arr.length;
        });
    };

    const headers = parseTableRow(headerLine);

    if (headers.length === 0) return { headers: [], rows: [], alignments: [] };

    const alignments: ('left' | 'center' | 'right')[] = [];
    if (separatorIndex >= 0 && separatorIndex < tableLines.length) {
      const separatorLine = tableLines[separatorIndex];
      const alignCells = parseTableRow(separatorLine);

      alignCells.forEach(cell => {
        const trimmed = cell.trim();
        if (trimmed.startsWith(':') && trimmed.endsWith(':')) {
          alignments.push('center');
        } else if (trimmed.endsWith(':')) {
          alignments.push('right');
        } else {
          alignments.push('left');
        }
      });
    }

    while (alignments.length < headers.length) {
      alignments.push('left');
    }

    const dataLines = tableLines.filter((line, index) => {
      const isHeader = line === headerLine;
      const isSeparator = index === separatorIndex;
      const isValidDataRow =
        !isHeader && !isSeparator && /[^\s\-:|]/.test(line) && line.includes('|');
      return isValidDataRow;
    });

    const rows = dataLines.map(line => {
      const cells = parseTableRow(line);

      const normalizedCells = [...cells];
      while (normalizedCells.length < headers.length) {
        normalizedCells.push('');
      }

      return normalizedCells.slice(0, headers.length);
    });

    return { headers, rows, alignments };
  };

  const markdownText = extractTextFromChildren(children);
  const { headers, rows, alignments } = parseMarkdownTable(markdownText);

  const getVariantStyles = () => {
    const baseContainer = responsive ? 'overflow-x-auto' : '';

    switch (variant) {
      case 'minimal':
        return {
          container: `my-6 ${baseContainer}`,
          table: 'w-full border-collapse',
          thead: 'border-b-2 border-gray-200/60 dark:border-white/20',
          th: 'px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider',
          tbody: '',
          tr: 'border-b border-gray-100/60 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-black/20 transition-colors',
          td: 'px-6 py-4 text-sm text-gray-900 dark:text-gray-100',
        };
      case 'bordered':
        return {
          container: `my-6 ${baseContainer}`,
          table:
            'w-full border-collapse border border-gray-200/60 dark:border-white/20 rounded-xl overflow-hidden shadow-sm backdrop-blur-sm',
          thead:
            'bg-gray-50/80 dark:bg-black/40 border-b border-gray-200/60 dark:border-white/20 backdrop-blur-sm',
          th: 'border-r border-gray-200/60 dark:border-white/10 px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider last:border-r-0',
          tbody: 'bg-white/80 dark:bg-black/60 backdrop-blur-sm',
          tr: 'border-b border-gray-200/60 dark:border-white/10 hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors last:border-b-0',
          td: 'border-r border-gray-200/60 dark:border-white/10 px-6 py-4 text-sm text-gray-900 dark:text-gray-100 last:border-r-0',
        };
      default:
        return {
          container: `my-8 ${baseContainer} not-prose`,
          table:
            'w-full border-collapse rounded-xl border border-gray-200/60 dark:border-white/20 overflow-hidden shadow-sm bg-white/80 dark:bg-black/60 backdrop-blur-sm',
          thead:
            'bg-gray-50/80 dark:bg-black/40 border-b border-gray-200/60 dark:border-white/20 backdrop-blur-sm',
          th: 'px-6 py-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider border-r border-gray-200/60 dark:border-white/10 last:border-r-0',
          tbody: 'divide-y divide-gray-200/60 dark:divide-white/10',
          tr: 'hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors',
          td: 'px-6 py-4 text-sm text-gray-900 dark:text-gray-100 border-r border-gray-200/60 dark:border-white/10 last:border-r-0',
        };
    }
  };

  const styles = getVariantStyles();

  const getAlignmentClass = (alignment: 'left' | 'center' | 'right') => {
    switch (alignment) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  const renderCellContent = (content: string) => {
    if (!content || content.trim() === '') {
      return <span className="text-zinc-400 dark:text-zinc-500">—</span>;
    }

    const processedContent = content.trim();
    const elements: React.ReactNode[] = [];
    let currentIndex = 0;

    const markdownRegex =
      /(`[^`]*`|\*\*[^*]+\*\*|__[^_]+__|(?<!\*)\*[^*]+\*(?!\*)|(?<!_)_[^_]+_(?!_)|\[([^\]]+)\]\(([^)]+)\)|~~[^~]+~~)/g;

    let match;
    while ((match = markdownRegex.exec(processedContent)) !== null) {
      if (match.index > currentIndex) {
        elements.push(processedContent.slice(currentIndex, match.index));
      }

      const matchedText = match[0];

      if (matchedText.startsWith('`') && matchedText.endsWith('`')) {
        const codeContent = matchedText.slice(1, -1);
        elements.push(
          <code
            key={match.index}
            className="px-2 py-1 text-xs font-mono bg-zinc-100 dark:bg-zinc-800 rounded border mx-0.5"
          >
            {codeContent}
          </code>
        );
      }
      else if (
        (matchedText.startsWith('**') && matchedText.endsWith('**')) ||
        (matchedText.startsWith('__') && matchedText.endsWith('__'))
      ) {
        const boldContent = matchedText.slice(2, -2);
        elements.push(
          <strong key={match.index} className="font-semibold">
            {boldContent}
          </strong>
        );
      }
      else if (
        (matchedText.startsWith('*') && matchedText.endsWith('*') && !matchedText.includes('**')) ||
        (matchedText.startsWith('_') && matchedText.endsWith('_') && !matchedText.includes('__'))
      ) {
        const italicContent = matchedText.slice(1, -1);
        elements.push(
          <em key={match.index} className="italic">
            {italicContent}
          </em>
        );
      }
      else if (matchedText.startsWith('~~') && matchedText.endsWith('~~')) {
        const strikeContent = matchedText.slice(2, -2);
        elements.push(
          <span key={match.index} className="line-through text-zinc-500 dark:text-zinc-400">
            {strikeContent}
          </span>
        );
      }
      else if (matchedText.includes('[') && matchedText.includes('](')) {
        const linkMatch = matchedText.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          elements.push(
            <a
              key={match.index}
              href={linkMatch[2]}
              className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkMatch[1]}
            </a>
          );
        }
      }

      currentIndex = match.index + matchedText.length;
    }

    if (currentIndex < processedContent.length) {
      elements.push(processedContent.slice(currentIndex));
    }

    if (elements.length === 0) {
      if (processedContent === '-' || processedContent === '—') {
        return <span className="text-zinc-400 dark:text-zinc-500">—</span>;
      }

      if (['✓', '✔', '✅', 'true', 'yes', 'Y'].includes(processedContent)) {
        return <span className="text-green-600 dark:text-green-400">✓</span>;
      }
      if (['✗', '✘', '❌', 'false', 'no', 'N'].includes(processedContent)) {
        return <span className="text-red-600 dark:text-red-400">✗</span>;
      }

      if (
        processedContent.startsWith('[') &&
        processedContent.endsWith(']') &&
        !processedContent.includes('](')
      ) {
        const badgeContent = processedContent.slice(1, -1);
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
            {badgeContent}
          </span>
        );
      }

      if (/^\d+(\.\d+)?%?$/.test(processedContent)) {
        return <span className="font-mono tabular-nums">{processedContent}</span>;
      }

      if (/^v?\d+\.\d+(\.\d+)?(-\w+)?$/.test(processedContent)) {
        return <span className="font-mono text-sm">{processedContent}</span>;
      }

      return processedContent;
    }

    return <>{elements}</>;
  };

  if (headers.length === 0) {
    return <div className="text-red-500">Invalid table format</div>;
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className={`${styles.th} ${getAlignmentClass(alignments[index] || 'left')}`}
              >
                {renderCellContent(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${styles.tr} ${
                striped && rowIndex % 2 === 1 ? 'bg-gray-50/50 dark:bg-gray-800/20' : ''
              }`}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`${styles.td} ${getAlignmentClass(alignments[cellIndex] || 'left')}`}
                >
                  {renderCellContent(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
