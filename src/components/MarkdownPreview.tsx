
import React from 'react';

interface MarkdownPreviewProps {
  content: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  const parseMarkdown = (text: string): JSX.Element => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    let currentIndex = 0;

    while (currentIndex < lines.length) {
      const line = lines[currentIndex];
      
      // Headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={currentIndex} className="text-3xl font-bold mb-4 text-gray-900">
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={currentIndex} className="text-2xl font-bold mb-3 text-gray-900">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={currentIndex} className="text-xl font-bold mb-2 text-gray-900">
            {line.substring(4)}
          </h3>
        );
      } 
      // Code blocks
      else if (line.startsWith('```')) {
        const language = line.substring(3);
        const codeLines: string[] = [];
        let codeIndex = currentIndex + 1;
        
        while (codeIndex < lines.length && !lines[codeIndex].startsWith('```')) {
          codeLines.push(lines[codeIndex]);
          codeIndex++;
        }
        
        elements.push(
          <div key={currentIndex} className="mb-4">
            {language && (
              <div className="bg-gray-100 px-3 py-1 text-xs text-gray-600 font-mono border-b">
                {language}
              </div>
            )}
            <pre className="bg-gray-900 text-green-400 p-4 rounded-b-md overflow-x-auto">
              <code className="text-sm font-mono">
                {codeLines.join('\n')}
              </code>
            </pre>
          </div>
        );
        
        currentIndex = codeIndex;
      }
      // Lists
      else if (line.startsWith('- ')) {
        const listItems: string[] = [];
        let listIndex = currentIndex;
        
        while (listIndex < lines.length && lines[listIndex].startsWith('- ')) {
          listItems.push(lines[listIndex].substring(2));
          listIndex++;
        }
        
        elements.push(
          <ul key={currentIndex} className="list-disc list-inside mb-4 space-y-1">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-gray-700">
                {parseInlineMarkdown(item)}
              </li>
            ))}
          </ul>
        );
        
        currentIndex = listIndex - 1;
      }
      // Empty lines
      else if (line.trim() === '') {
        // Skip empty lines
      }
      // Regular paragraphs
      else {
        elements.push(
          <p key={currentIndex} className="mb-4 text-gray-700 leading-relaxed">
            {parseInlineMarkdown(line)}
          </p>
        );
      }
      
      currentIndex++;
    }

    return <div className="prose max-w-none">{elements}</div>;
  };

  const parseInlineMarkdown = (text: string): JSX.Element => {
    // Bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic text
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Inline code
    text = text.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-red-600">$1</code>');
    
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <div className="h-full overflow-y-auto">
      {content ? parseMarkdown(content) : (
        <div className="text-gray-500 italic">
          Start writing to see the preview...
        </div>
      )}
    </div>
  );
};
