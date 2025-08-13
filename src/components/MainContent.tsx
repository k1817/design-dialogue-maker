import { useState } from 'react';
import { Database, Settings, BarChart } from 'lucide-react';
import FeatureCard from './FeatureCard';
import FileUpload from './FileUpload';
import ChatInput from './ChatInput';
import ThemePreview from './ThemePreview';

const MainContent = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [showUpload, setShowUpload] = useState(false);

  const features = [
    {
      icon: Database,
      title: "Query Response Time",
      description: "Faster responses improve user experience and retention.",
      iconColor: "text-orange-500"
    },
    {
      icon: Settings,
      title: "Search Accuracy Rate", 
      description: "Higher accuracy ensures users find relevant information efficiently.",
      iconColor: "text-primary"
    },
    {
      icon: BarChart,
      title: "User Query Volume",
      description: "Helps assess system load, user engagement, and feature adoption.",
      iconColor: "text-purple-500"
    }
  ];

  const handleFileSelect = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleSendMessage = (message: string, attachedFiles: File[], inputLanguage: string, outputLanguage: string) => {
    console.log('Sending message:', message);
    console.log('With files:', attachedFiles);
    console.log('Input language:', inputLanguage);
    console.log('Output language:', outputLanguage);
    
    // Simulate AI response with text-to-speech
    setTimeout(() => {
      const responses = {
        'en-US': 'I received your message and I\'m ready to help you with your request.',
        'es-ES': 'Recibí tu mensaje y estoy listo para ayudarte con tu solicitud.',
        'fr-FR': 'J\'ai reçu votre message et je suis prêt à vous aider avec votre demande.',
        'de-DE': 'Ich habe Ihre Nachricht erhalten und bin bereit, Ihnen bei Ihrer Anfrage zu helfen.',
        'it-IT': 'Ho ricevuto il tuo messaggio e sono pronto ad aiutarti con la tua richiesta.',
        'pt-BR': 'Recebi sua mensagem e estou pronto para ajudá-lo com sua solicitação.',
        'ja-JP': 'メッセージを受信しました。ご要望にお応えする準備ができています。',
        'zh-CN': '我收到了您的消息，准备好帮助您处理您的请求。'
      };
      
      const responseText = responses[outputLanguage as keyof typeof responses] || responses['en-US'];
      
      // Text-to-speech for the response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(responseText);
        utterance.lang = outputLanguage;
        speechSynthesis.speak(utterance);
      }
    }, 1000);
    
    // Clear files after sending
    setFiles([]);
  };

  const handleAttachFile = () => {
    setShowUpload(!showUpload);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background relative">
      {/* Theme Preview */}
      <ThemePreview />
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4 bg-gradient-primary bg-clip-text text-transparent">
              What can I help with?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here to support your ideas, coding, and beyond.
              What's on your mind today?
            </p>
          </div>

          {/* File Upload Section */}
          {showUpload && (
            <div className="mb-12">
              <FileUpload 
                onFileSelect={handleFileSelect}
                className="max-w-2xl mx-auto"
              />
            </div>
          )}

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                iconColor={feature.iconColor}
              />
            ))}
          </div>

          {/* Spacer to push chat input to bottom */}
          <div className="h-32" />
        </div>
      </div>

      {/* Chat Input - Fixed at Bottom */}
      <ChatInput
        onSendMessage={handleSendMessage}
        onAttachFile={handleAttachFile}
        files={files}
      />
    </div>
  );
};

export default MainContent;