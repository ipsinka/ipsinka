import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";

export function useTranslation() {
  const { language, toggleLanguage, t } = useLanguage();

  // Helper function for quick translation access
  const translate = (key, translations) => {
    if (typeof translations === 'object' && translations[language]) {
      return translations[language];
    }
    return translations?.[language] || translations?.es || key;
  };

  // Enhanced search function to find words across all vocabulary categories
  const searchVocabulary = (searchTerm) => {
    const results = [];
    const searchLower = searchTerm.toLowerCase();

    // Search in verbs, nouns, and adjectives
    ['verbs', 'nouns', 'adjectives'].forEach(category => {
      if (translations[category]) {
        Object.entries(translations[category]).forEach(([key, translation]) => {
          const spanishWord = translation.es?.toLowerCase() || '';
          const ingaWord = translation.inga?.toLowerCase() || '';

          if (spanishWord.includes(searchLower) || ingaWord.includes(searchLower)) {
            results.push({
              key,
              category,
              spanish: translation.es,
              inga: translation.inga
            });
          }
        });
      }
    });

    return results;
  };

  // Function to get a specific word translation from the extended vocabulary
  const getVocabularyWord = (category, key) => {
    if (translations[category] && translations[category][key]) {
      return t(translations[category][key]);
    }
    return key;
  };

  return {
    language,
    toggleLanguage,
    t,
    translate,
    searchVocabulary,
    getVocabularyWord,
    isIngan: language === 'inga',
    isSpanish: language === 'es'
  };
}