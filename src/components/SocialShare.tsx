import React, { useState } from 'react';
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  LinkedinShareButton, 
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon
} from 'react-share';
import { Heart, Share2, X, Copy, Check } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  onSave?: () => void;
  isSaved?: boolean;
}

const SocialShare: React.FC<SocialShareProps> = ({ 
  url, 
  title, 
  description = '', 
  onSave, 
  isSaved = false 
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : url;

  return (
    <>
      <div className="flex items-center gap-4">
        <button 
          onClick={onSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            isSaved 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white/80 text-luxury-maroon hover:bg-white border border-luxury-taupe/20'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          <span className="font-luxury-sans text-sm">
            {isSaved ? 'Saved' : 'Save'}
          </span>
        </button>

        <button 
          onClick={() => setShowShareModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 text-luxury-maroon hover:bg-white rounded-lg transition-colors duration-300 border border-luxury-taupe/20"
        >
          <Share2 className="w-4 h-4" />
          <span className="font-luxury-sans text-sm">Share</span>
        </button>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-luxury-serif text-xl font-bold text-luxury-maroon">
                Share Article
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 hover:bg-luxury-taupe/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-luxury-maroon/70" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 p-3 hover:bg-luxury-soft-pink/20 rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5 text-luxury-maroon" />
                )}
                <span className="font-luxury-sans text-luxury-maroon">
                  {copied ? 'Link copied!' : 'Copy link'}
                </span>
              </button>

              {/* Social Share Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <FacebookShareButton
                  url={shareUrl}
                  hashtag="#wedding"
                  className="w-full"
                >
                  <div className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors w-full">
                    <FacebookIcon size={24} round />
                    <span className="font-luxury-sans text-sm text-luxury-maroon">Facebook</span>
                  </div>
                </FacebookShareButton>

                <TwitterShareButton
                  url={shareUrl}
                  title={title}
                  className="w-full"
                >
                  <div className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors w-full">
                    <TwitterIcon size={24} round />
                    <span className="font-luxury-sans text-sm text-luxury-maroon">Twitter</span>
                  </div>
                </TwitterShareButton>

                <LinkedinShareButton
                  url={shareUrl}
                  title={title}
                  summary={description}
                  className="w-full"
                >
                  <div className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors w-full">
                    <LinkedinIcon size={24} round />
                    <span className="font-luxury-sans text-sm text-luxury-maroon">LinkedIn</span>
                  </div>
                </LinkedinShareButton>

                <WhatsappShareButton
                  url={shareUrl}
                  title={title}
                  className="w-full"
                >
                  <div className="flex items-center gap-3 p-3 hover:bg-green-50 rounded-lg transition-colors w-full">
                    <WhatsappIcon size={24} round />
                    <span className="font-luxury-sans text-sm text-luxury-maroon">WhatsApp</span>
                  </div>
                </WhatsappShareButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialShare; 