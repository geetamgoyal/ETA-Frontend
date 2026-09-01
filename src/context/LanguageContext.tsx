import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation & Layout
    'nav.brand_title': 'RailForecast AI',
    'nav.ops_intelligence': 'Ops Intelligence',
    'nav.dashboard': 'Dashboard',
    'nav.train_monitoring': 'Train Monitoring',
    'nav.live_network': 'Live Network',
    'nav.eta_forecast': 'AI ETA Forecast',
    'nav.route_predictions': 'Route Predictions',
    'nav.alerts': 'Alerts',
    'nav.analytics': 'Analytics',
    'nav.system_status': 'System Status',
    'nav.settings': 'Settings',
    'nav.profile': 'Profile',
    'nav.new_simulation': 'New Simulation',
    'nav.collapse_sidebar': 'Collapse Sidebar',
    'nav.expand_sidebar': 'Expand Sidebar',
    'nav.operations': 'Operations',
    'nav.intelligence': 'Intelligence & Alerts',
    'nav.system_admin': 'System & Admin',
    'nav.simulation_tool': 'Simulation Tool',
    'nav.view_control': 'View Control',
    'nav.platform': 'Platform',

    // Top Navbar
    'topbar.live_monitoring': 'LIVE MONITORING',
    'topbar.last_updated': 'Last updated: 12 seconds ago',
    'topbar.search_placeholder': 'Search train (e.g., 12309, Rajdhani)...',
    'topbar.alerts_title': 'Alert Notifications',
    'topbar.critical_count': '3 Critical',
    'topbar.view_all_alerts': 'View All Alerts & Operational Risks →',
    'topbar.chief_controller': 'Chief Controller',
    'topbar.ncr_hq': 'NCR Operations HQ',
    'topbar.lang_switch_hint': 'Switch to Hindi (हिन्दी)',
    'topbar.lang_current': 'English',
    'topbar.lang_target': 'हिन्दी',

    // Tooltip Descriptions
    'desc.dashboard': 'Live operations overview, network health & real-time KPIs',
    'desc.train_monitoring': 'Track coaching trains, live speeds, delays & current halts',
    'desc.live_network': 'Interactive railway network map, active junctions & tracks',
    'desc.eta_forecast': 'AI-predicted arrival times, delay risk & recovery curves',
    'desc.route_predictions': 'Congestion heatmaps, switch routing & alternate paths',
    'desc.alerts': 'Active emergency alarms, unusual stoppages & speed warnings',
    'desc.analytics': 'Historical punctuality trends, speed stats & dwell times',
    'desc.system_status': 'Telemetry feeds health, AI model latencies & sensor status',
    'desc.settings': 'Configure alert thresholds, map layers & system parameters',
    'desc.profile': 'Chief Controller credentials & assigned sector HQ',
    'desc.new_simulation': 'Run what-if scenario simulations to evaluate train delay mitigations & routing',
    'desc.toggle_sidebar': 'Toggle sidebar size (Keyboard shortcut: [ )',
    'desc.platform': 'AI-Powered Railway Operations & Intelligent ETA Forecasting Platform',

    // Badges & Labels
    'badge.live': 'LIVE',
    'badge.12_live': '12 Live',
    'badge.ai': 'AI',
    'badge.3_critical': '3 Critical',
    'badge.99_9': '99.9%',
    'badge.interactive': 'Interactive',
    'badge.shortcut': 'Shortcut [',
    'badge.sector_online': 'NCR Sector Online',

    // Dashboard
    'dash.title': 'Operations Dashboard',
    'dash.subtitle': 'Real-time railway monitoring and AI-powered ETA forecasting for coaching trains',
    'dash.trains_monitored': 'Trains Monitored',
    'dash.on_time_trains': 'On-Time Trains',
    'dash.delayed_trains': 'Delayed Trains',
    'dash.critical_eta_risks': 'Critical ETA Risks',
    'dash.ai_accuracy': 'AI Accuracy',
    'dash.today_plus8': '+8 today',
    'dash.from_yesterday': '↓ 3 from yesterday',
    'dash.require_attention': '3 require attention',
    'dash.network_health': 'Network Health: Stable',
    'dash.health_strip_desc': '82 trains on time • 34 delayed • 12 critical risks • 94.2% AI predictive confidence',
    'dash.recent_eta_changes': 'Recent ETA Changes',
    'dash.view_all_trains': 'View All Trains →',
    'dash.th_train': 'Train',
    'dash.th_location': 'Current Location',
    'dash.th_prev_eta': 'Previous ETA',
    'dash.th_updated_eta': 'Updated AI ETA',
    'dash.th_change': 'Change',
    'dash.th_status': 'Status',
    'dash.ai_insights_title': 'AI ETA & Dispatch Insights',
    'dash.critical_alerts_title': 'Critical Operational Alerts',
    'dash.live_map_title': 'NCR Live Railway Network',

    // Simulation Modal
    'sim.title': 'AI What-If Operational Simulation',
    'sim.subtitle': 'Simulate network disruptions, TSRs, and signal clearance to predict cascading ETA impacts.',
    'sim.target_train': 'Target Coaching Train',
    'sim.disruption_scenario': 'Disruption Scenario',
    'sim.corridor_section': 'Corridor / Block Section',
    'sim.magnitude': 'Disruption Magnitude',
    'sim.run_btn': 'Run AI ETA Forecast Simulation',
    'sim.running': 'Computing Neural ETA Vector...',
    'sim.result_title': 'Simulation Forecast Result',
    'sim.confidence': 'Prediction Confidence',
    'sim.baseline_eta': 'Baseline ETA',
    'sim.simulated_eta': 'Simulated ETA',
    'sim.delta_impact': 'Delta Impact',
    'sim.close': 'Close',

    // Footer
    'footer.cluster_active': 'Cluster Active (128 Nodes)',
    'footer.model_version': 'Model v4.2.0-rf-coaching',
    'footer.stats': 'Avg Network Delay: 12 min | On-Time Performance: 64% | AI ETA Accuracy: 94.2%',
    'footer.platform_copyright': '© RailForecast AI • Operational Intelligence Platform',

    // Other Pages
    'trains.title': 'Train Monitoring Grid',
    'trains.subtitle': 'Real-time telemetry and positional tracking across NCR coaching network',
    'network.title': 'Live Railway Network',
    'network.subtitle': 'Interactive block section and junction topology map',
    'eta.title': 'AI ETA Forecasting Engine',
    'eta.subtitle': 'Deep learning neural models predicting section arrival times & delay recovery',
    'routes.title': 'Route Predictions & Optimization',
    'routes.subtitle': 'Real-time congestion heatmaps, dynamic routing and junction conflict avoidance',
    'alerts.title': 'Operational Alerts & Risks',
    'alerts.subtitle': 'Critical event monitoring, unexpected halts & safety protocol alarms',
    'analytics.title': 'Operations Analytics',
    'analytics.subtitle': 'Historical punctuality trends, speed distributions and corridor throughput',
    'status.title': 'System & Telemetry Status',
    'status.subtitle': 'Subsystem health, IoT feed status and machine learning inference latency',
    'settings.title': 'System Settings',
    'settings.subtitle': 'Configure alerting thresholds, AI hyperparameters and operational display parameters',
    'profile.title': 'Controller Profile',
    'profile.subtitle': 'Operational credentials and session parameters',
  },
  hi: {
    // Navigation & Layout
    'nav.brand_title': 'रेलफोरकास्ट AI',
    'nav.ops_intelligence': 'परिचालन खुफिया',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.train_monitoring': 'ट्रेन निगरानी',
    'nav.live_network': 'लाइव नेटवर्क',
    'nav.eta_forecast': 'AI ईटीए पूर्वानुमान',
    'nav.route_predictions': 'मार्ग भविष्यवाणी',
    'nav.alerts': 'अलर्ट्स',
    'nav.analytics': 'एनालिटिक्स',
    'nav.system_status': 'सिस्टम स्थिति',
    'nav.settings': 'सेटिंग्स',
    'nav.profile': 'प्रोफ़ाइल',
    'nav.new_simulation': 'नई सिमुलेशन',
    'nav.collapse_sidebar': 'साइडबार समेटें',
    'nav.expand_sidebar': 'साइडबार खोलें',
    'nav.operations': 'संचालन',
    'nav.intelligence': 'खुफिया एवं अलर्ट',
    'nav.system_admin': 'सिस्टम एवं प्रशासन',
    'nav.simulation_tool': 'सिमुलेशन टूल',
    'nav.view_control': 'दृश्य नियंत्रण',
    'nav.platform': 'प्लेटफ़ॉर्म',

    // Top Navbar
    'topbar.live_monitoring': 'लाइव निगरानी',
    'topbar.last_updated': 'अंतिम अपडेट: 12 सेकंड पहले',
    'topbar.search_placeholder': 'ट्रेन खोजें (उदा. 12309, राजधानी)...',
    'topbar.alerts_title': 'अलर्ट सूचनाएं',
    'topbar.critical_count': '3 गंभीर',
    'topbar.view_all_alerts': 'सभी अलर्ट और परिचालन जोखिम देखें →',
    'topbar.chief_controller': 'मुख्य नियंत्रक',
    'topbar.ncr_hq': 'उत्तर मध्य रेलवे मुख्यालय',
    'topbar.lang_switch_hint': 'Switch to English (अंग्रेज़ी)',
    'topbar.lang_current': 'हिन्दी',
    'topbar.lang_target': 'English',

    // Tooltip Descriptions
    'desc.dashboard': 'लाइव संचालन अवलोकन, नेटवर्क स्वास्थ्य और वास्तविक समय के मुख्य संकेतक',
    'desc.train_monitoring': 'कोचिंग ट्रेनों की लाइव गति, देरी और ठहराव की निगरानी',
    'desc.live_network': 'इंटरएक्टिव रेलवे नेटवर्क मानचित्र, सक्रिय जंक्शन और ट्रैक',
    'desc.eta_forecast': 'AI-अनुमानित आगमन समय, देरी जोखिम और रिकवरी वक्र',
    'desc.route_predictions': 'भीड़भाड़ हीटमैप, स्विच रूटिंग और वैकल्पिक मार्ग',
    'desc.alerts': 'सक्रिय आपातकालीन अलार्म, असामान्य ठहराव और गति प्रतिबंध चेतावनी',
    'desc.analytics': 'ऐतिहासिक समयबद्धता रुझान, गति आंकड़े और स्टेशन ठहराव समय',
    'desc.system_status': 'टेलीमेट्री फीड स्थिति, AI मॉडल विलंबता और सेंसर स्वास्थ्य',
    'desc.settings': 'अलर्ट सीमाएं, मानचित्र परतें और सिस्टम सेटिंग्स कॉन्फ़िगर करें',
    'desc.profile': 'मुख्य नियंत्रक क्रेडेंशियल और आवंटित सेक्टर मुख्यालय',
    'desc.new_simulation': 'ट्रेन देरी शमन और रूटिंग का मूल्यांकन करने के लिए व्हाट-इफ़ परिदृश्य सिमुलेशन चलाएं',
    'desc.toggle_sidebar': 'साइडबार आकार बदलें (कीबोर्ड शॉर्टकट: [ )',
    'desc.platform': 'AI-संचालित रेलवे संचालन और बुद्धिमान ईटीए पूर्वानुमान प्लेटफ़ॉर्म',

    // Badges & Labels
    'badge.live': 'लाइव',
    'badge.12_live': '12 लाइव',
    'badge.ai': 'AI',
    'badge.3_critical': '3 गंभीर',
    'badge.99_9': '99.9%',
    'badge.interactive': 'इंटरएक्टिव',
    'badge.shortcut': 'शॉर्टकट [',
    'badge.sector_online': 'एनसीआर सेक्टर ऑनलाइन',

    // Dashboard
    'dash.title': 'परिचालन डैशबोर्ड',
    'dash.subtitle': 'कोचिंग ट्रेनों के लिए रीयल-टाइम रेलवे निगरानी और AI-संचालित ईटीए पूर्वानुमान',
    'dash.trains_monitored': 'निगरानी की जा रही ट्रेनें',
    'dash.on_time_trains': 'समय पर ट्रेनें',
    'dash.delayed_trains': 'विलंबित ट्रेनें',
    'dash.critical_eta_risks': 'गंभीर ईटीए जोखिम',
    'dash.ai_accuracy': 'AI सटीकता',
    'dash.today_plus8': '+8 आज',
    'dash.from_yesterday': '↓ 3 कल से कम',
    'dash.require_attention': '3 पर ध्यान आवश्यक',
    'dash.network_health': 'नेटवर्क स्वास्थ्य: स्थिर',
    'dash.health_strip_desc': '82 ट्रेनें समय पर • 34 विलंबित • 12 गंभीर जोखिम • 94.2% AI भविष्य कहनेवाला विश्वास',
    'dash.recent_eta_changes': 'हालिया ईटीए परिवर्तन',
    'dash.view_all_trains': 'सभी ट्रेनें देखें →',
    'dash.th_train': 'ट्रेन',
    'dash.th_location': 'वर्तमान स्थिति',
    'dash.th_prev_eta': 'पिछला ईटीए',
    'dash.th_updated_eta': 'अपडेटेड AI ईटीए',
    'dash.th_change': 'परिवर्तन',
    'dash.th_status': 'स्थिति',
    'dash.ai_insights_title': 'AI ईटीए और प्रेषण अंतर्दृष्टि',
    'dash.critical_alerts_title': 'गंभीर परिचालन अलर्ट',
    'dash.live_map_title': 'एनसीआर लाइव रेलवे नेटवर्क',

    // Simulation Modal
    'sim.title': 'AI व्हाट-इफ़ परिचालन सिमुलेशन',
    'sim.subtitle': 'कैस्केडिंग ईटीए प्रभावों की भविष्यवाणी करने के लिए नेटवर्क व्यवधान, टीएसआर और सिग्नल क्लीयरेंस का अनुकरण करें।',
    'sim.target_train': 'लक्षित कोचिंग ट्रेन',
    'sim.disruption_scenario': 'व्यवधान परिदृश्य',
    'sim.corridor_section': 'कॉरिडोर / ब्लॉक सेक्शन',
    'sim.magnitude': 'व्यवधान तीव्रता',
    'sim.run_btn': 'AI ईटीए पूर्वानुमान सिमुलेशन चलाएं',
    'sim.running': 'न्यूरल ईटीए वेक्टर की गणना की जा रही है...',
    'sim.result_title': 'सिमुलेशन पूर्वानुमान परिणाम',
    'sim.confidence': 'भविष्यवाणी विश्वास स्तर',
    'sim.baseline_eta': 'मूल ईटीए',
    'sim.simulated_eta': 'सिम्युलेटेड ईटीए',
    'sim.delta_impact': 'डेल्टा प्रभाव',
    'sim.close': 'बंद करें',

    // Footer
    'footer.cluster_active': 'क्लस्टर सक्रिय (128 नोड्स)',
    'footer.model_version': 'मॉडल v4.2.0-rf-coaching',
    'footer.stats': 'औसत नेटवर्क देरी: 12 मिनट | समय पर प्रदर्शन: 64% | AI ईटीए सटीकता: 94.2%',
    'footer.platform_copyright': '© रेलफोरकास्ट AI • परिचालन खुफिया प्लेटफ़ॉर्म',

    // Other Pages
    'trains.title': 'ट्रेन निगरानी ग्रिड',
    'trains.subtitle': 'उत्तर मध्य रेलवे नेटवर्क पर वास्तविक समय टेलीमेट्री और स्थिति ट्रैकिंग',
    'network.title': 'लाइव रेलवे नेटवर्क',
    'network.subtitle': 'इंटरएक्टिव ब्लॉक सेक्शन और जंक्शन टोपोलॉजी मानचित्र',
    'eta.title': 'AI ईटीए पूर्वानुमान इंजन',
    'eta.subtitle': 'सेक्शन आगमन समय और देरी रिकवरी की भविष्यवाणी करने वाले डीप लर्निंग न्यूरल मॉडल',
    'routes.title': 'मार्ग भविष्यवाणी एवं अनुकूलन',
    'routes.subtitle': 'रीयल-टाइम भीड़भाड़ हीटमैप, डायनामिक रूटिंग और जंक्शन टकराव परिहार',
    'alerts.title': 'परिचालन अलर्ट एवं जोखिम',
    'alerts.subtitle': 'गंभीर घटना निगरानी, अप्रत्याशित ठहराव और सुरक्षा प्रोटोकॉल अलार्म',
    'analytics.title': 'परिचालन विश्लेषण',
    'analytics.subtitle': 'ऐतिहासिक समयबद्धता रुझान, गति वितरण और कॉरिडोर थ्रूपुट',
    'status.title': 'सिस्टम एवं टेलीमेट्री स्थिति',
    'status.subtitle': 'सबसिस्टम स्वास्थ्य, IoT फीड स्थिति और मशीन लर्निंग इंफरेंस विलंबता',
    'settings.title': 'सिस्टम सेटिंग्स',
    'settings.subtitle': 'अलर्ट सीमाएं, AI हाइपरपैरामीटर और परिचालन प्रदर्शन सेटिंग्स कॉन्फ़िगर करें',
    'profile.title': 'नियंत्रक प्रोफ़ाइल',
    'profile.subtitle': 'परिचालन क्रेडेंशियल और सत्र पैरामीटर',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('railforecast_lang');
      return saved === 'hi' || saved === 'en' ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('railforecast_lang', lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const t = (key: string, fallback?: string): string => {
    const dict = translations[language];
    if (dict && dict[key]) {
      return dict[key];
    }
    const enDict = translations['en'];
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
