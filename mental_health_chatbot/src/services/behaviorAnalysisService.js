/**
 * Behavior Analysis Service
 * Analyzes conversation patterns and generates therapy reports
 */

class BehaviorAnalysisService {
  constructor() {
    this.analysisCache = new Map();
  }

  /**
   * Analyze conversation patterns from chat messages
   * @param {Array} messages - Array of chat messages
   * @param {Object} options - Analysis options
   * @returns {Object} Analysis results
   */
  analyzeConversationPatterns(messages, options = {}) {
    const {
      timeRange = 30, // days
      includeMoodAnalysis = true,
      includeCrisisIndicators = true,
      includeTopicAnalysis = true
    } = options;

    // Filter messages by time range
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - timeRange);
    
    const recentMessages = messages.filter(msg => 
      new Date(msg.timestamp) >= cutoffDate
    );

    const analysis = {
      summary: this.generateSummary(recentMessages),
      moodPatterns: includeMoodAnalysis ? this.analyzeMoodPatterns(recentMessages) : null,
      crisisIndicators: includeCrisisIndicators ? this.analyzeCrisisIndicators(recentMessages) : null,
      topicAnalysis: includeTopicAnalysis ? this.analyzeTopics(recentMessages) : null,
      communicationPatterns: this.analyzeCommunicationPatterns(recentMessages),
      recommendations: this.generateRecommendations(recentMessages),
      metadata: {
        totalMessages: recentMessages.length,
        timeRange: timeRange,
        analysisDate: new Date().toISOString(),
        userMessages: recentMessages.filter(msg => msg.sender === 'user').length,
        botMessages: recentMessages.filter(msg => msg.sender === 'bot').length
      }
    };

    return analysis;
  }

  /**
   * Generate overall summary of conversation patterns
   */
  generateSummary(messages) {
    const userMessages = messages.filter(msg => msg.sender === 'user');
    const totalWords = userMessages.reduce((count, msg) => 
      count + (msg.content ? msg.content.split(' ').length : 0), 0
    );
    
    const avgMessageLength = userMessages.length > 0 ? totalWords / userMessages.length : 0;
    
    // Analyze emotional tone
    const emotionalKeywords = {
      positive: ['happy', 'good', 'great', 'better', 'improved', 'grateful', 'thankful', 'excited', 'hopeful'],
      negative: ['sad', 'bad', 'terrible', 'awful', 'depressed', 'anxious', 'worried', 'stressed', 'overwhelmed'],
      neutral: ['okay', 'fine', 'normal', 'regular', 'average', 'same']
    };

    const emotionalTone = this.analyzeEmotionalTone(userMessages, emotionalKeywords);
    
    return {
      totalInteractions: userMessages.length,
      averageMessageLength: Math.round(avgMessageLength),
      emotionalTone: emotionalTone,
      engagementLevel: this.calculateEngagementLevel(userMessages),
      primaryConcerns: this.identifyPrimaryConcerns(userMessages)
    };
  }

  /**
   * Analyze mood patterns over time
   */
  analyzeMoodPatterns(messages) {
    const userMessages = messages.filter(msg => msg.sender === 'user');
    
    // Group messages by day
    const dailyMessages = {};
    userMessages.forEach(msg => {
      const date = new Date(msg.timestamp).toDateString();
      if (!dailyMessages[date]) {
        dailyMessages[date] = [];
      }
      dailyMessages[date].push(msg);
    });

    // Analyze mood trends
    const moodTrends = Object.keys(dailyMessages).map(date => {
      const dayMessages = dailyMessages[date];
      const moodScore = this.calculateMoodScore(dayMessages);
      return {
        date: date,
        messageCount: dayMessages.length,
        moodScore: moodScore,
        dominantEmotion: this.getDominantEmotion(dayMessages)
      };
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
      trends: moodTrends,
      averageMoodScore: moodTrends.reduce((sum, day) => sum + day.moodScore, 0) / moodTrends.length,
      moodVolatility: this.calculateMoodVolatility(moodTrends),
      bestDay: moodTrends.reduce((best, day) => day.moodScore > best.moodScore ? day : best),
      worstDay: moodTrends.reduce((worst, day) => day.moodScore < worst.moodScore ? day : worst)
    };
  }

  /**
   * Analyze crisis indicators
   */
  analyzeCrisisIndicators(messages) {
    const userMessages = messages.filter(msg => msg.sender === 'user');
    
    const crisisKeywords = [
      'suicide', 'kill myself', 'end it all', 'not worth living',
      'hurt myself', 'self harm', 'cut myself', 'overdose',
      'hopeless', 'no point', 'give up', 'can\'t go on'
    ];

    const crisisMessages = userMessages.filter(msg => 
      crisisKeywords.some(keyword => 
        msg.content.toLowerCase().includes(keyword)
      )
    );

    const anxietyKeywords = [
      'anxious', 'panic', 'worried', 'scared', 'fear', 'nervous',
      'overwhelmed', 'stressed', 'can\'t breathe', 'heart racing'
    ];

    const anxietyMessages = userMessages.filter(msg => 
      anxietyKeywords.some(keyword => 
        msg.content.toLowerCase().includes(keyword)
      )
    );

    const depressionKeywords = [
      'depressed', 'sad', 'empty', 'numb', 'worthless', 'guilty',
      'tired', 'no energy', 'can\'t sleep', 'no appetite'
    ];

    const depressionMessages = userMessages.filter(msg => 
      depressionKeywords.some(keyword => 
        msg.content.toLowerCase().includes(keyword)
      )
    );

    return {
      crisisLevel: this.calculateCrisisLevel(crisisMessages, userMessages.length),
      anxietyLevel: this.calculateAnxietyLevel(anxietyMessages, userMessages.length),
      depressionLevel: this.calculateDepressionLevel(depressionMessages, userMessages.length),
      crisisMessages: crisisMessages.length,
      anxietyMessages: anxietyMessages.length,
      depressionMessages: depressionMessages.length,
      riskAssessment: this.assessRiskLevel(crisisMessages, anxietyMessages, depressionMessages)
    };
  }

  /**
   * Analyze conversation topics
   */
  analyzeTopics(messages) {
    const userMessages = messages.filter(msg => msg.sender === 'user');
    
    const topicCategories = {
      relationships: ['family', 'friend', 'partner', 'relationship', 'love', 'breakup', 'divorce'],
      work: ['work', 'job', 'career', 'boss', 'colleague', 'office', 'meeting'],
      health: ['health', 'doctor', 'medication', 'therapy', 'treatment', 'symptoms'],
      sleep: ['sleep', 'insomnia', 'nightmare', 'tired', 'exhausted', 'rest'],
      anxiety: ['anxious', 'worry', 'panic', 'fear', 'nervous', 'stress'],
      depression: ['depressed', 'sad', 'down', 'hopeless', 'empty', 'worthless'],
      selfCare: ['exercise', 'meditation', 'breathing', 'relaxation', 'self-care'],
      goals: ['goal', 'plan', 'future', 'dream', 'aspiration', 'ambition']
    };

    const topicFrequency = {};
    Object.keys(topicCategories).forEach(topic => {
      topicFrequency[topic] = 0;
    });

    userMessages.forEach(msg => {
      const content = msg.content.toLowerCase();
      Object.keys(topicCategories).forEach(topic => {
        if (topicCategories[topic].some(keyword => content.includes(keyword))) {
          topicFrequency[topic]++;
        }
      });
    });

    const sortedTopics = Object.entries(topicFrequency)
      .sort(([,a], [,b]) => b - a)
      .map(([topic, count]) => ({
        topic: topic,
        frequency: count,
        percentage: userMessages.length > 0 ? (count / userMessages.length) * 100 : 0
      }));

    return {
      topTopics: sortedTopics.slice(0, 5),
      allTopics: sortedTopics,
      topicDiversity: this.calculateTopicDiversity(sortedTopics)
    };
  }

  /**
   * Analyze communication patterns
   */
  analyzeCommunicationPatterns(messages) {
    const userMessages = messages.filter(msg => msg.sender === 'user');
    
    // Analyze message timing patterns
    const hourDistribution = new Array(24).fill(0);
    const dayDistribution = new Array(7).fill(0);
    
    userMessages.forEach(msg => {
      const date = new Date(msg.timestamp);
      hourDistribution[date.getHours()]++;
      dayDistribution[date.getDay()]++;
    });

    // Analyze response patterns
    const responseTimes = [];
    for (let i = 0; i < messages.length - 1; i++) {
      if (messages[i].sender === 'user' && messages[i + 1].sender === 'bot') {
        const responseTime = new Date(messages[i + 1].timestamp) - new Date(messages[i].timestamp);
        responseTimes.push(responseTime);
      }
    }

    return {
      peakHours: this.findPeakHours(hourDistribution),
      peakDays: this.findPeakDays(dayDistribution),
      averageResponseTime: responseTimes.length > 0 ? 
        responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length : 0,
      conversationLength: this.analyzeConversationLength(messages),
      engagementPattern: this.analyzeEngagementPattern(userMessages)
    };
  }

  /**
   * Generate therapy recommendations
   */
  generateRecommendations(messages) {
    const analysis = this.analyzeConversationPatterns(messages, { timeRange: 30 });
    const recommendations = [];

    // Crisis recommendations
    if (analysis.crisisIndicators.crisisLevel > 0.1) {
      recommendations.push({
        type: 'crisis',
        priority: 'high',
        title: 'Crisis Support',
        description: 'Consider immediate crisis intervention and safety planning.',
        action: 'Schedule urgent therapy session and develop safety plan.'
      });
    }

    // Anxiety recommendations
    if (analysis.crisisIndicators.anxietyLevel > 0.3) {
      recommendations.push({
        type: 'anxiety',
        priority: 'medium',
        title: 'Anxiety Management',
        description: 'High levels of anxiety detected in conversations.',
        action: 'Focus on anxiety management techniques and consider CBT approaches.'
      });
    }

    // Depression recommendations
    if (analysis.crisisIndicators.depressionLevel > 0.3) {
      recommendations.push({
        type: 'depression',
        priority: 'medium',
        title: 'Depression Support',
        description: 'Signs of depression present in conversation patterns.',
        action: 'Consider depression screening and mood tracking interventions.'
      });
    }

    // Sleep recommendations
    if (analysis.topicAnalysis.topTopics.some(topic => topic.topic === 'sleep' && topic.frequency > 0)) {
      recommendations.push({
        type: 'sleep',
        priority: 'low',
        title: 'Sleep Hygiene',
        description: 'Sleep-related concerns mentioned frequently.',
        action: 'Implement sleep hygiene practices and consider sleep diary.'
      });
    }

    // Relationship recommendations
    if (analysis.topicAnalysis.topTopics.some(topic => topic.topic === 'relationships' && topic.frequency > 0)) {
      recommendations.push({
        type: 'relationships',
        priority: 'medium',
        title: 'Relationship Support',
        description: 'Relationship concerns are a primary focus.',
        action: 'Consider relationship counseling or communication skills training.'
      });
    }

    return recommendations;
  }

  // Helper methods
  analyzeEmotionalTone(messages, keywords) {
    let positive = 0, negative = 0, neutral = 0;
    
    messages.forEach(msg => {
      const content = msg.content.toLowerCase();
      if (keywords.positive.some(word => content.includes(word))) positive++;
      else if (keywords.negative.some(word => content.includes(word))) negative++;
      else neutral++;
    });

    const total = positive + negative + neutral;
    if (total === 0) return 'neutral';

    if (positive > negative && positive > neutral) return 'positive';
    if (negative > positive && negative > neutral) return 'negative';
    return 'neutral';
  }

  calculateEngagementLevel(messages) {
    const totalMessages = messages.length;
    if (totalMessages === 0) return 'low';
    
    const avgWordsPerMessage = messages.reduce((sum, msg) => 
      sum + (msg.content ? msg.content.split(' ').length : 0), 0
    ) / totalMessages;

    if (avgWordsPerMessage > 20 && totalMessages > 10) return 'high';
    if (avgWordsPerMessage > 10 && totalMessages > 5) return 'medium';
    return 'low';
  }

  identifyPrimaryConcerns(messages) {
    const concerns = [];
    const content = messages.map(msg => msg.content).join(' ').toLowerCase();
    
    if (content.includes('anxious') || content.includes('worry')) concerns.push('Anxiety');
    if (content.includes('sad') || content.includes('depressed')) concerns.push('Depression');
    if (content.includes('sleep') || content.includes('tired')) concerns.push('Sleep Issues');
    if (content.includes('work') || content.includes('job')) concerns.push('Work Stress');
    if (content.includes('relationship') || content.includes('family')) concerns.push('Relationships');
    
    return concerns;
  }

  calculateMoodScore(messages) {
    const positiveWords = ['happy', 'good', 'great', 'better', 'improved'];
    const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'worse'];
    
    let score = 0;
    messages.forEach(msg => {
      const content = msg.content.toLowerCase();
      positiveWords.forEach(word => {
        if (content.includes(word)) score += 1;
      });
      negativeWords.forEach(word => {
        if (content.includes(word)) score -= 1;
      });
    });
    
    return Math.max(-10, Math.min(10, score));
  }

  getDominantEmotion(messages) {
    const emotions = {
      happy: ['happy', 'joy', 'excited', 'great', 'wonderful'],
      sad: ['sad', 'depressed', 'down', 'blue', 'miserable'],
      anxious: ['anxious', 'worried', 'nervous', 'scared', 'panic'],
      angry: ['angry', 'mad', 'furious', 'irritated', 'frustrated'],
      calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil']
    };

    const emotionScores = {};
    Object.keys(emotions).forEach(emotion => {
      emotionScores[emotion] = 0;
    });

    messages.forEach(msg => {
      const content = msg.content.toLowerCase();
      Object.keys(emotions).forEach(emotion => {
        emotions[emotion].forEach(word => {
          if (content.includes(word)) emotionScores[emotion]++;
        });
      });
    });

    return Object.keys(emotionScores).reduce((a, b) => 
      emotionScores[a] > emotionScores[b] ? a : b
    );
  }

  calculateMoodVolatility(moodTrends) {
    if (moodTrends.length < 2) return 0;
    
    const scores = moodTrends.map(day => day.moodScore);
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
    
    return Math.sqrt(variance);
  }

  calculateCrisisLevel(crisisMessages, totalMessages) {
    return totalMessages > 0 ? crisisMessages.length / totalMessages : 0;
  }

  calculateAnxietyLevel(anxietyMessages, totalMessages) {
    return totalMessages > 0 ? anxietyMessages.length / totalMessages : 0;
  }

  calculateDepressionLevel(depressionMessages, totalMessages) {
    return totalMessages > 0 ? depressionMessages.length / totalMessages : 0;
  }

  assessRiskLevel(crisisMessages, anxietyMessages, depressionMessages) {
    if (crisisMessages.length > 0) return 'high';
    if (anxietyMessages.length > 5 || depressionMessages.length > 5) return 'medium';
    return 'low';
  }

  findPeakHours(hourDistribution) {
    const maxCount = Math.max(...hourDistribution);
    return hourDistribution.map((count, hour) => ({ hour, count }))
      .filter(item => item.count === maxCount)
      .map(item => item.hour);
  }

  findPeakDays(dayDistribution) {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const maxCount = Math.max(...dayDistribution);
    return dayDistribution.map((count, day) => ({ day: dayNames[day], count }))
      .filter(item => item.count === maxCount)
      .map(item => item.day);
  }

  analyzeConversationLength(messages) {
    const conversations = [];
    let currentConversation = [];
    
    messages.forEach(msg => {
      if (msg.sender === 'user') {
        currentConversation.push(msg);
      } else if (currentConversation.length > 0) {
        conversations.push(currentConversation.length);
        currentConversation = [];
      }
    });
    
    if (currentConversation.length > 0) {
      conversations.push(currentConversation.length);
    }
    
    return {
      averageLength: conversations.length > 0 ? 
        conversations.reduce((sum, len) => sum + len, 0) / conversations.length : 0,
      maxLength: conversations.length > 0 ? Math.max(...conversations) : 0,
      totalConversations: conversations.length
    };
  }

  analyzeEngagementPattern(messages) {
    const timeGaps = [];
    for (let i = 1; i < messages.length; i++) {
      const gap = new Date(messages[i].timestamp) - new Date(messages[i-1].timestamp);
      timeGaps.push(gap);
    }
    
    const avgGap = timeGaps.length > 0 ? 
      timeGaps.reduce((sum, gap) => sum + gap, 0) / timeGaps.length : 0;
    
    return {
      averageResponseTime: avgGap,
      consistency: this.calculateConsistency(timeGaps),
      engagementTrend: this.calculateEngagementTrend(messages)
    };
  }

  calculateConsistency(timeGaps) {
    if (timeGaps.length < 2) return 'unknown';
    
    const mean = timeGaps.reduce((sum, gap) => sum + gap, 0) / timeGaps.length;
    const variance = timeGaps.reduce((sum, gap) => sum + Math.pow(gap - mean, 2), 0) / timeGaps.length;
    const stdDev = Math.sqrt(variance);
    
    const coefficient = stdDev / mean;
    if (coefficient < 0.3) return 'high';
    if (coefficient < 0.7) return 'medium';
    return 'low';
  }

  calculateEngagementTrend(messages) {
    if (messages.length < 10) return 'insufficient_data';
    
    const firstHalf = messages.slice(0, Math.floor(messages.length / 2));
    const secondHalf = messages.slice(Math.floor(messages.length / 2));
    
    const firstHalfAvg = firstHalf.reduce((sum, msg) => 
      sum + (msg.content ? msg.content.split(' ').length : 0), 0
    ) / firstHalf.length;
    
    const secondHalfAvg = secondHalf.reduce((sum, msg) => 
      sum + (msg.content ? msg.content.split(' ').length : 0), 0
    ) / secondHalf.length;
    
    if (secondHalfAvg > firstHalfAvg * 1.2) return 'increasing';
    if (secondHalfAvg < firstHalfAvg * 0.8) return 'decreasing';
    return 'stable';
  }

  calculateTopicDiversity(sortedTopics) {
    const totalFrequency = sortedTopics.reduce((sum, topic) => sum + topic.frequency, 0);
    if (totalFrequency === 0) return 0;
    
    const entropy = sortedTopics.reduce((sum, topic) => {
      const probability = topic.frequency / totalFrequency;
      return sum - (probability * Math.log2(probability));
    }, 0);
    
    return Math.min(1, entropy / Math.log2(sortedTopics.length));
  }

  /**
   * Generate a therapy report
   */
  generateTherapyReport(analysis) {
    const report = {
      title: 'Mental Health Conversation Analysis Report',
      generatedDate: new Date().toISOString(),
      patientId: 'user123', // This would come from user data
      summary: analysis.summary,
      moodPatterns: analysis.moodPatterns,
      crisisIndicators: analysis.crisisIndicators,
      topicAnalysis: analysis.topicAnalysis,
      communicationPatterns: analysis.communicationPatterns,
      recommendations: analysis.recommendations,
      metadata: analysis.metadata
    };

    return report;
  }

  /**
   * Export report as text
   */
  exportReportAsText(report) {
    let text = `${report.title}\n`;
    text += `Generated: ${new Date(report.generatedDate).toLocaleDateString()}\n`;
    text += `Patient ID: ${report.patientId}\n\n`;
    
    text += `=== SUMMARY ===\n`;
    text += `Total Interactions: ${report.summary.totalInteractions}\n`;
    text += `Average Message Length: ${report.summary.averageMessageLength} words\n`;
    text += `Emotional Tone: ${report.summary.emotionalTone}\n`;
    text += `Engagement Level: ${report.summary.engagementLevel}\n`;
    text += `Primary Concerns: ${report.summary.primaryConcerns.join(', ')}\n\n`;
    
    if (report.moodPatterns) {
      text += `=== MOOD PATTERNS ===\n`;
      text += `Average Mood Score: ${report.moodPatterns.averageMoodScore.toFixed(2)}\n`;
      text += `Mood Volatility: ${report.moodPatterns.moodVolatility.toFixed(2)}\n`;
      text += `Best Day: ${report.moodPatterns.bestDay.date} (Score: ${report.moodPatterns.bestDay.moodScore})\n`;
      text += `Worst Day: ${report.moodPatterns.worstDay.date} (Score: ${report.moodPatterns.worstDay.moodScore})\n\n`;
    }
    
    if (report.crisisIndicators) {
      text += `=== CRISIS INDICATORS ===\n`;
      text += `Crisis Level: ${(report.crisisIndicators.crisisLevel * 100).toFixed(1)}%\n`;
      text += `Anxiety Level: ${(report.crisisIndicators.anxietyLevel * 100).toFixed(1)}%\n`;
      text += `Depression Level: ${(report.crisisIndicators.depressionLevel * 100).toFixed(1)}%\n`;
      text += `Risk Assessment: ${report.crisisIndicators.riskAssessment}\n\n`;
    }
    
    if (report.topicAnalysis) {
      text += `=== TOPIC ANALYSIS ===\n`;
      report.topicAnalysis.topTopics.forEach((topic, index) => {
        text += `${index + 1}. ${topic.topic}: ${topic.frequency} mentions (${topic.percentage.toFixed(1)}%)\n`;
      });
      text += `\n`;
    }
    
    text += `=== RECOMMENDATIONS ===\n`;
    report.recommendations.forEach((rec, index) => {
      text += `${index + 1}. [${rec.priority.toUpperCase()}] ${rec.title}\n`;
      text += `   ${rec.description}\n`;
      text += `   Action: ${rec.action}\n\n`;
    });
    
    return text;
  }
}

// Create and export a singleton instance
const behaviorAnalysisService = new BehaviorAnalysisService();

export default behaviorAnalysisService;
