
import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse, generateSpeech } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { ICONS } from '../constants';
import { useAudio } from '../hooks/useAudio';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! How can I help you today with your maternity or child health questions?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { play, isPlaying } = useAudio();
  const [currentlySpeaking, setCurrentlySpeaking] = useState<number | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getChatResponse(input);
      setMessages([...newMessages, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'model', text: 'An error occurred. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = async (text: string, index: number) => {
    if (isPlaying) return;
    setCurrentlySpeaking(index);
    const audioContent = await generateSpeech(text);
    if (audioContent) {
        await play(audioContent);
    }
    setCurrentlySpeaking(null);
  };

  return (
    <div className="bg-card rounded-xl shadow-lg max-w-4xl mx-auto flex flex-col h-[75vh]">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-text">Maternity Health Chatbot</h2>
      </div>
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-lg p-3 rounded-lg flex items-start space-x-2 ${
                msg.role === 'user' ? 'bg-primary text-white' : 'bg-slate-100 text-text'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
              {msg.role === 'model' && (
                <button 
                  onClick={() => handleSpeak(msg.text, index)} 
                  className="text-text-secondary hover:text-primary disabled:opacity-50"
                  disabled={isPlaying}
                >
                  {currentlySpeaking === index ? (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  ) : ICONS.sound}
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-lg bg-slate-100 text-text">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="flex-1 p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="p-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:bg-slate-400 flex items-center justify-center w-10 h-10"
          >
            {ICONS.send}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
