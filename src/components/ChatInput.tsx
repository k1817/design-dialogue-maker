import { useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onAttachFile: () => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, onAttachFile, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-border bg-background/50 backdrop-blur-sm p-6">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative bg-chat-bubble border border-border rounded-xl shadow-card">
          <div className="flex items-start p-4 space-x-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onAttachFile}
              className="mt-1 h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-1 h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground"
            >
              <Smile className="w-4 h-4" />
            </Button>
            
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write message here..."
              className="flex-1 min-h-[40px] max-h-32 border-0 bg-transparent resize-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground"
              disabled={disabled}
            />
            
            <Button
              type="submit"
              disabled={!message.trim() || disabled}
              className="mt-1 h-8 w-8 p-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-spring disabled:opacity-50 disabled:shadow-none"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-3">
          Press Enter to send, Shift + Enter for new line
        </p>
      </form>
    </div>
  );
};

export default ChatInput;