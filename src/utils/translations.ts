import { Language } from '../types';

export interface TranslationSet {
  nav: {
    hero: string;
    hq: string;
    memes: string;
    chaos: string;
    missions: string;
    armory: string;
    secret: string;
    about: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    warning: string;
    badge: string;
    tacosLeft: string;
  };
  chaos: {
    button: string;
    level: string;
    warning1: string;
    warning2: string;
    warning3: string;
    secretUnlocked: string;
  };
  missions: {
    title: string;
    subtitle: string;
    completed: string;
    activeMission: string;
  };
  memes: {
    title: string;
    subtitle: string;
    generate: string;
    flipHint: string;
  };
  common: {
    soundOn: string;
    soundOff: string;
    login: string;
    signup: string;
    logout: string;
    welcome: string;
    easterEggFound: string;
    chimichangaFound: string;
  };
}

export const translations: Record<Language, TranslationSet> = {
  en: {
    nav: {
      hero: "Home",
      hq: "The HQ",
      memes: "Meme Vault",
      chaos: "Chaos Room",
      missions: "Missions",
      armory: "Armory / Gear",
      secret: "Secret Area 🔒",
      about: "About Wade"
    },
    hero: {
      title: "HEY! YOU FOUND THE WEBSITE.",
      subtitle: "Unfortunately, you can't leave now.",
      cta: "START THE ADVENTURE",
      warning: "Rated R for Ridiculous. Fourth wall broken permanently.",
      badge: "Merc With A Mouth Approved",
      tacosLeft: "Stolen Chimichangas: "
    },
    chaos: {
      button: "DO NOT PRESS",
      level: "CHAOS LEVEL",
      warning1: "Seriously? I explicitly said DO NOT PRESS!",
      warning2: "Why are you still clicking this? You're breaking my UI!",
      warning3: "STOP! You are tearing the fabric of this React app!",
      secretUnlocked: "💥 MAXIMUM EFFORT! Secret Room Unlocked! Check the top bar!"
    },
    missions: {
      title: "MERCENARY MISSIONS",
      subtitle: "Find the stolen chimichanga before I lose my sanity.",
      completed: "Missions Completed",
      activeMission: "Current Case: The Case of the Missing Spicy Chimichanga"
    },
    memes: {
      title: "MEME VAULT",
      subtitle: "Certified 100% organic, locally sourced absurdity.",
      generate: "🎲 GENERATE CHAOS",
      flipHint: "Click card to flip punchline"
    },
    common: {
      soundOn: "🔊 SOUND ON",
      soundOff: "🔇 SOUND OFF",
      login: "Merc Login",
      signup: "Join the Chaos",
      logout: "Exit HQ",
      welcome: "Welcome, Freelancer",
      easterEggFound: "🎉 Secret Easter Egg Unlocked!",
      chimichangaFound: "🌯 You found a hidden Chimichanga!"
    }
  },
  hi: {
    nav: {
      hero: "होम",
      hq: "अड्डा (HQ)",
      memes: "मीम तिजोरी",
      chaos: "तबाही रूम",
      missions: "मिशन",
      armory: "हथियार / गियर",
      secret: "गुप्त क्षेत्र 🔒",
      about: "वेड के बारे में"
    },
    hero: {
      title: "अरे भाई! तूने वेबसाइट ढूंढ ही ली!",
      subtitle: "पर अफ़सोस, अब तू यहाँ से भाग नहीं सकता।",
      cta: "कारनामा शुरू करो!",
      warning: "चेतावनी: चौथी दीवार पूरी तरह टूट चुकी है!",
      badge: "डेडपूल द्वारा सत्यापित",
      tacosLeft: "चोरी हुए चिमिचांगा: "
    },
    chaos: {
      button: "बिल्कुल मत दबाना!",
      level: "तबाही का स्तर",
      warning1: "अबे बोला ना मत दबा! क्या चूल है?",
      warning2: "अरे भाई रुक जा! पूरा यूआई हिला दिया तूने!",
      warning3: "बस कर भाई! पूरी वेबसाइट का रायता फैल गया!",
      secretUnlocked: "💥 पूरा हंगामा! गुप्त कमरा खुल गया! ऊपर देखो!"
    },
    missions: {
      title: "किराए के टट्टू के मिशन",
      subtitle: "मेरा चुराया हुआ तीखा चिमिचांगा वापस लाओ!",
      completed: "पूरे किए गए मिशन",
      activeMission: "वर्तमान केस: चोरी हुए चिमिचांगा की तलाश"
    },
    memes: {
      title: "मीम तिजोरी",
      subtitle: "शुद्ध और असली पागलपन भरे मीम्स।",
      generate: "🎲 नया रायता फैलाओ",
      flipHint: "पंचलाइन देखने के लिए कार्ड पलटें"
    },
    common: {
      soundOn: "🔊 आवाज़ चालू",
      soundOff: "🔇 आवाज़ बंद",
      login: "लॉगिन",
      signup: "खाता खोलो",
      logout: "बाहर निकलो",
      welcome: "स्वागत है खिलाड़ी",
      easterEggFound: "🎉 गुप्त ईस्टर एग मिल गया!",
      chimichangaFound: "🌯 छुपा हुआ चिमिचांगा मिल गया!"
    }
  },
  mr: {
    nav: {
      hero: "मुख्य",
      hq: "आपला अड्डा",
      memes: "मीमचा खजिना",
      chaos: "धिंगाणा रूम",
      missions: "मोहिमा",
      armory: "शस्त्रास्त्रे",
      secret: "गुप्त जागा 🔒",
      about: "वेड बद्दल"
    },
    hero: {
      title: "ए भावा! शेवटी सापडली ही वेबसाईट!",
      subtitle: "दुर्दैवाने, आता इथून पळता येणार नाही!",
      cta: "धिंगाणा सुरू करा!",
      warning: "सावधान: पूर्णपणे डोके फिरवणारा अनुभव!",
      badge: "डेडपूल प्रमाणित",
      tacosLeft: "चोरी झालेले चिमिचांगा: "
    },
    chaos: {
      button: "हात लावू नका!",
      level: "धिंगाणा पातळी",
      warning1: "अरे सांगितलं ना हात नको लावू!",
      warning2: "काय राव, परत परत तेच? वेबसाईट हलवलीस तू!",
      warning3: "थांब भावा! आता खरा राडा होणार आहे!",
      secretUnlocked: "💥 विषय संपला! गुप्त खोली उघडली! वर बघा!"
    },
    missions: {
      title: "भाडोत्री मोहिमा",
      subtitle: "माझा चोरीला गेलेला चवदार चिमिचांगा शोधा!",
      completed: "पूर्ण मोहिमा",
      activeMission: "चालू शोध: चोरी झालेला चिमिचांगा"
    },
    memes: {
      title: "मीमचा खजिना",
      subtitle: "१००% शुद्ध आणि मनोरंजक मीम्स.",
      generate: "🎲 नवा धिंगाणा",
      flipHint: "मज्जा बघण्यासाठी कार्ड उलटा"
    },
    common: {
      soundOn: "🔊 आवाज सुरू",
      soundOff: "🔇 आवाज बंद",
      login: "लॉगिन",
      signup: "नोंदणी करा",
      logout: "बाहेर पडा",
      welcome: "स्वागत आहे गड्या",
      easterEggFound: "🎉 गुपित सापडले!",
      chimichangaFound: "🌯 लपलेला चिमिचांगा सापडला!"
    }
  }
};
