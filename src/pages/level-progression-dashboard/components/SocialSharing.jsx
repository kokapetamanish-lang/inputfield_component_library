import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, CheckCircle } from 'lucide-react';

const SocialSharing = ({ level, className = '' }) => {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const shareData = {
    title: `Memory Maze - Level ${level?.id} Completed!`,
    text: `I just conquered Level ${level?.id} in Memory Maze! ${
      level?.stars ? `Got ${level?.stars}/3 stars` : ''
    } ${level?.bestTime ? `with a time of ${level?.bestTime}s` : ''}. Can you beat my score?`,
    url: window.location?.origin,
  };

  const handleShare = async () => {
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (error?.name !== 'AbortError') {
          console.error('Error sharing:', error);
          fallbackShare();
        }
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    setShowShareMenu(true);
  };

  const copyToClipboard = async () => {
    try {
      const shareText = `${shareData?.title}\n${shareData?.text}\n${shareData?.url}`;
      await navigator.clipboard?.writeText(shareText);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowShareMenu(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const shareToSocial = (platform) => {
    const encodedText = encodeURIComponent(shareData?.text);
    const encodedUrl = encodeURIComponent(shareData?.url);
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText} ${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
    };

    if (urls?.[platform]) {
      window.open(urls?.[platform], '_blank', 'noopener,noreferrer');
      setShowShareMenu(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-colors w-full justify-center"
      >
        <Share2 className="w-5 h-5" />
        Share Achievement
      </button>
      {/* Fallback Share Menu */}
      {showShareMenu && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-slate-700 rounded-xl p-4 shadow-xl z-10"
          onClick={(e) => e?.stopPropagation()}
        >
          <h4 className="text-white font-medium mb-3 text-center">Share your achievement</h4>
          
          {/* Social Platforms */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => shareToSocial('twitter')}
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
            >
              <div className="w-4 h-4 bg-white rounded text-blue-500 flex items-center justify-center text-xs font-bold">X</div>
              Twitter
            </button>
            <button
              onClick={() => shareToSocial('facebook')}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
            >
              <div className="w-4 h-4 bg-white rounded text-blue-600 flex items-center justify-center text-xs font-bold">f</div>
              Facebook
            </button>
            <button
              onClick={() => shareToSocial('whatsapp')}
              className="flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors"
            >
              <div className="w-4 h-4 bg-white rounded text-green-500 flex items-center justify-center text-xs font-bold">W</div>
              WhatsApp
            </button>
            <button
              onClick={() => shareToSocial('telegram')}
              className="flex items-center gap-2 px-3 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors"
            >
              <div className="w-4 h-4 bg-white rounded text-blue-400 flex items-center justify-center text-xs font-bold">T</div>
              Telegram
            </button>
          </div>

          {/* Copy Link */}
          <button
            onClick={copyToClipboard}
            className="w-full flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Link
              </>
            )}
          </button>

          {/* Close button */}
          <button
            onClick={() => setShowShareMenu(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center text-gray-300 text-sm"
          >
            ×
          </button>
        </motion.div>
      )}
      {/* Backdrop for closing menu */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default SocialSharing;