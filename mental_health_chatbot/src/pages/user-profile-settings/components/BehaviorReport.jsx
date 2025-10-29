import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import { analyzeBehaviorPatterns } from "../../../services/chatService";
import { getConversationsFromSupabase } from "../../../services/supabaseService";

const BehaviorReport = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState(30);
  const [includeOptions, setIncludeOptions] = useState({
    moodAnalysis: true,
    crisisIndicators: true,
    topicAnalysis: true,
    communicationPatterns: true
  });

  const generateReport = async () => {
    setIsGenerating(true);
    setError(null);
    setReport(null);

    try {
      // Fetch conversations from Supabase
      const conversations = await getConversationsFromSupabase();
      
      if (!conversations || conversations.length === 0) {
        setError("No conversation data found. Please have some conversations with the chatbot first.");
        setIsGenerating(false);
        return;
      }

      // Filter conversations by time range
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - timeRange);
      
      const filteredConversations = conversations.map(conv => ({
        ...conv,
        messages: (conv.messages || []).filter(msg => 
          new Date(msg.timestamp) >= cutoffDate
        )
      })).filter(conv => conv.messages.length > 0);

      if (filteredConversations.length === 0) {
        setError(`No conversations found in the last ${timeRange} days. Please have some conversations with the chatbot first.`);
        setIsGenerating(false);
        return;
      }

      // Generate behavior analysis using OpenRouter API
      const analysis = await analyzeBehaviorPatterns(filteredConversations, timeRange);

      setReport(analysis);
    } catch (err) {
      console.error('Error generating behavior report:', err);
      setError("Failed to generate report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const exportReport = (format = 'txt') => {
    if (!report) return;

    if (format === 'pdf') {
      exportAsPDF(report);
    } else {
      const reportText = formatReportForExport(report);
      const blob = new Blob([reportText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `behavior-report-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const exportAsPDF = (report) => {
    // Create a new window for PDF generation
    const printWindow = window.open('', '_blank');
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Behavior Analysis Report</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 40px;
            color: #333;
            background: white;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #4F46E5;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #4F46E5;
            margin: 0;
            font-size: 28px;
          }
          .header p {
            color: #666;
            margin: 5px 0;
          }
          .section {
            margin-bottom: 25px;
            page-break-inside: avoid;
          }
          .section h2 {
            color: #4F46E5;
            border-bottom: 2px solid #E5E7EB;
            padding-bottom: 8px;
            margin-bottom: 15px;
            font-size: 20px;
          }
          .section h3 {
            color: #374151;
            margin: 15px 0 8px 0;
            font-size: 16px;
          }
          .summary-box {
            background: #F8FAFC;
            border-left: 4px solid #4F46E5;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
          }
          .risk-high {
            background: #FEF2F2;
            border-left: 4px solid #EF4444;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
          }
          .risk-medium {
            background: #FFFBEB;
            border-left: 4px solid #F59E0B;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
          }
          .risk-low {
            background: #F0FDF4;
            border-left: 4px solid #10B981;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
          }
          .recommendations {
            background: #F0F9FF;
            border-left: 4px solid #0EA5E9;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
          }
          ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          li {
            margin: 5px 0;
          }
          .metadata {
            background: #F9FAFB;
            padding: 15px;
            border-radius: 8px;
            margin-top: 30px;
            font-size: 14px;
            color: #6B7280;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #E5E7EB;
            text-align: center;
            color: #6B7280;
            font-size: 12px;
          }
          @media print {
            body { margin: 20px; }
            .section { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Behavior Analysis Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          <p>Analysis Period: Last ${report.metadata.timeRange} days</p>
          <p>Total Messages Analyzed: ${report.metadata.totalMessages}</p>
        </div>

        <div class="section">
          <h2>Executive Summary</h2>
          <div class="summary-box">
            <h3>Overview</h3>
            <p>${report.summary.overview}</p>
            <h3>Detailed Insights</h3>
            <p>${report.summary.detailedInsights}</p>
          </div>
        </div>

        ${report.moodPatterns ? `
        <div class="section">
          <h2>Mood Patterns Analysis</h2>
          <h3>Primary Mood State</h3>
          <p>${report.moodPatterns.primaryMood}</p>
          
          <h3>Mood Stability</h3>
          <p>${report.moodPatterns.stability}</p>
          
          <h3>Common Emotional States</h3>
          <ul>
            ${report.moodPatterns.commonMoods.map(mood => `<li>${mood}</li>`).join('')}
          </ul>
          
          <h3>Mood Trends</h3>
          <p>${report.moodPatterns.trends}</p>
        </div>
        ` : ''}

        ${report.crisisIndicators ? `
        <div class="section">
          <h2>Crisis Assessment</h2>
          <div class="risk-${report.crisisIndicators.level.toLowerCase()}">
            <h3>Risk Level: ${report.crisisIndicators.level}</h3>
            
            <h3>Risk Factors</h3>
            <ul>
              ${report.crisisIndicators.riskFactors.map(factor => `<li>${factor}</li>`).join('')}
            </ul>
            
            <h3>Protective Factors</h3>
            <ul>
              ${report.crisisIndicators.protectiveFactors.map(factor => `<li>${factor}</li>`).join('')}
            </ul>
            
            <h3>Clinical Recommendations</h3>
            <ul>
              ${report.crisisIndicators.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
          </div>
        </div>
        ` : ''}

        ${report.topicAnalysis ? `
        <div class="section">
          <h2>Topic Analysis</h2>
          <h3>Primary Concerns</h3>
          <ul>
            ${report.topicAnalysis.primaryConcerns.map(concern => `<li>${concern}</li>`).join('')}
          </ul>
          
          <h3>Frequently Discussed Topics</h3>
          <ul>
            ${report.topicAnalysis.frequentTopics.map(topic => `<li>${topic}</li>`).join('')}
          </ul>
          
          <h3>Topic Evolution</h3>
          <p>${report.topicAnalysis.evolution}</p>
        </div>
        ` : ''}

        <div class="section">
          <h2>Communication Patterns</h2>
          <h3>Engagement Level</h3>
          <p>${report.communicationPatterns.engagementLevel}</p>
          
          <h3>Communication Style</h3>
          <p>${report.communicationPatterns.communicationStyle}</p>
          
          <h3>Response Patterns</h3>
          <p>${report.communicationPatterns.responseTime}</p>
          
          <h3>Message Characteristics</h3>
          <p>${report.communicationPatterns.messageLength}</p>
        </div>

        <div class="section">
          <h2>Clinical Recommendations</h2>
          <div class="recommendations">
            <ul>
              ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="metadata">
          <h3>Report Metadata</h3>
          <p><strong>Analysis Date:</strong> ${new Date(report.metadata.analysisDate).toLocaleString()}</p>
          <p><strong>Time Range:</strong> ${report.metadata.timeRange} days</p>
          <p><strong>Total Messages:</strong> ${report.metadata.totalMessages}</p>
          <p><strong>User Messages:</strong> ${report.metadata.userMessages}</p>
          <p><strong>Bot Messages:</strong> ${report.metadata.botMessages}</p>
        </div>

        <div class="footer">
          <p>This report was generated by the Mental Health Chatbot and is intended to provide insights for therapeutic discussions.</p>
          <p>Please review with a qualified mental health professional.</p>
          <p>Generated on ${new Date().toLocaleString()}</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const formatReportForExport = (report) => {
    const date = new Date().toLocaleDateString();
    return `
BEHAVIOR ANALYSIS REPORT
Generated on: ${date}
Analysis Period: Last ${report.metadata.timeRange} days
Total Messages: ${report.metadata.totalMessages}

═══════════════════════════════════════════════════════════════════════════════

EXECUTIVE SUMMARY
───────────────────────────────────────────────────────────────────────────────

OVERVIEW:
${report.summary.overview}

DETAILED INSIGHTS:
${report.summary.detailedInsights}

═══════════════════════════════════════════════════════════════════════════════

MOOD PATTERNS ANALYSIS
───────────────────────────────────────────────────────────────────────────────
${report.moodPatterns ? `
PRIMARY MOOD STATE:
${report.moodPatterns.primaryMood}

MOOD STABILITY:
${report.moodPatterns.stability}

COMMON EMOTIONAL STATES:
${report.moodPatterns.commonMoods.map(mood => `• ${mood}`).join('\n')}

MOOD TRENDS:
${report.moodPatterns.trends}
` : 'Mood analysis not included in this report.'}

═══════════════════════════════════════════════════════════════════════════════

CRISIS ASSESSMENT
───────────────────────────────────────────────────────────────────────────────
${report.crisisIndicators ? `
RISK LEVEL: ${report.crisisIndicators.level}

RISK FACTORS:
${report.crisisIndicators.riskFactors.map(factor => `• ${factor}`).join('\n')}

PROTECTIVE FACTORS:
${report.crisisIndicators.protectiveFactors.map(factor => `• ${factor}`).join('\n')}

CLINICAL RECOMMENDATIONS:
${report.crisisIndicators.recommendations.map(rec => `• ${rec}`).join('\n')}
` : 'Crisis analysis not included in this report.'}

═══════════════════════════════════════════════════════════════════════════════

TOPIC ANALYSIS
───────────────────────────────────────────────────────────────────────────────
${report.topicAnalysis ? `
PRIMARY CONCERNS:
${report.topicAnalysis.primaryConcerns.map(concern => `• ${concern}`).join('\n')}

FREQUENTLY DISCUSSED TOPICS:
${report.topicAnalysis.frequentTopics.map(topic => `• ${topic}`).join('\n')}

TOPIC EVOLUTION:
${report.topicAnalysis.evolution}
` : 'Topic analysis not included in this report.'}

═══════════════════════════════════════════════════════════════════════════════

COMMUNICATION PATTERNS
───────────────────────────────────────────────────────────────────────────────

ENGAGEMENT LEVEL:
${report.communicationPatterns.engagementLevel}

COMMUNICATION STYLE:
${report.communicationPatterns.communicationStyle}

RESPONSE PATTERNS:
${report.communicationPatterns.responseTime}

MESSAGE CHARACTERISTICS:
${report.communicationPatterns.messageLength}

═══════════════════════════════════════════════════════════════════════════════

CLINICAL RECOMMENDATIONS
───────────────────────────────────────────────────────────────────────────────

${report.recommendations.map(rec => `• ${rec}`).join('\n')}

═══════════════════════════════════════════════════════════════════════════════

REPORT METADATA
───────────────────────────────────────────────────────────────────────────────

Analysis Date: ${new Date(report.metadata.analysisDate).toLocaleString()}
Time Range: ${report.metadata.timeRange} days
Total Messages: ${report.metadata.totalMessages}
User Messages: ${report.metadata.userMessages}
Bot Messages: ${report.metadata.botMessages}

═══════════════════════════════════════════════════════════════════════════════

DISCLAIMER
───────────────────────────────────────────────────────────────────────────────

This report was generated by the Mental Health Chatbot and is intended to provide 
insights for therapeutic discussions. This report should be used as a supplement 
to, not a replacement for, professional mental health assessment and treatment.

Please review this report with a qualified mental health professional.

Generated on: ${new Date().toLocaleString()}
    `.trim();
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Icon name="FileText" size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="heading-medium text-blue-800">Behavior Analysis Report</h3>
            <p className="body-small text-blue-600">Generate a comprehensive report of your conversation patterns for therapy sessions</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <p className="body-small text-neutral-600 mb-4">
            This report analyzes your conversations with the chatbot to identify patterns, mood trends, and areas of concern. 
            It can be shared with your therapist to provide valuable insights for your sessions.
          </p>
          
          <div className="space-y-4">
            {/* Time Range Selection */}
            <div>
              <label className="block body-small font-medium text-neutral-700 mb-2">
                Analysis Period
              </label>
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(parseInt(e.target.value))}
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={7}>Last 7 days</option>
                <option value={14}>Last 2 weeks</option>
                <option value={30}>Last 30 days</option>
                <option value={60}>Last 2 months</option>
                <option value={90}>Last 3 months</option>
              </select>
            </div>

            {/* Include Options */}
            <div>
              <label className="block body-small font-medium text-neutral-700 mb-2">
                Include in Report
              </label>
              <div className="space-y-2">
                {Object.entries(includeOptions).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setIncludeOptions(prev => ({
                        ...prev,
                        [key]: e.target.checked
                      }))}
                      className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-blue-500"
                    />
                    <span className="body-small text-neutral-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateReport}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Report...</span>
                </>
              ) : (
                <>
                  <Icon name="FileText" size={20} />
                  <span>Generate Behavior Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={20} className="text-red-500" />
            <span className="body-small text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Report Display */}
      {report && (
        <div className="bg-white rounded-xl shadow-md border border-neutral-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={24} className="text-green-600" />
                <div>
                  <h3 className="heading-medium text-green-800">Report Generated Successfully</h3>
                  <p className="body-small text-green-600">
                    Analysis of {report.metadata.totalMessages} messages over {report.metadata.timeRange} days
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => exportReport('txt')}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                >
                  <Icon name="Download" size={16} />
                  <span>Export TXT</span>
                </button>
                <button
                  onClick={() => exportReport('pdf')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                >
                  <Icon name="FileText" size={16} />
                  <span>Export PDF</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Executive Summary */}
            <div>
              <h4 className="heading-small text-neutral-800 mb-3">Executive Summary</h4>
              <div className="bg-neutral-50 rounded-lg p-4">
                <p className="body-medium text-neutral-700">{report.summary.overview}</p>
              </div>
            </div>

            {/* Mood Patterns */}
            {report.moodPatterns && (
              <div>
                <h4 className="heading-small text-neutral-800 mb-3">Mood Patterns</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Heart" size={16} className="text-blue-600" />
                      <span className="body-small font-medium text-blue-800">Primary Mood</span>
                    </div>
                    <p className="body-medium text-blue-700">{report.moodPatterns.primaryMood}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="TrendingUp" size={16} className="text-purple-600" />
                      <span className="body-small font-medium text-purple-800">Stability</span>
                    </div>
                    <p className="body-medium text-purple-700">{report.moodPatterns.stability}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Crisis Indicators */}
            {report.crisisIndicators && (
              <div>
                <h4 className="heading-small text-neutral-800 mb-3">Crisis Assessment</h4>
                <div className={`rounded-lg p-4 ${
                  report.crisisIndicators.level === 'High' ? 'bg-red-50 border border-red-200' :
                  report.crisisIndicators.level === 'Medium' ? 'bg-yellow-50 border border-yellow-200' :
                  'bg-green-50 border border-green-200'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon 
                      name={report.crisisIndicators.level === 'High' ? 'AlertTriangle' : 'Shield'} 
                      size={16} 
                      className={report.crisisIndicators.level === 'High' ? 'text-red-600' : 
                                report.crisisIndicators.level === 'Medium' ? 'text-yellow-600' : 'text-green-600'} 
                    />
                    <span className={`body-small font-medium ${
                      report.crisisIndicators.level === 'High' ? 'text-red-800' :
                      report.crisisIndicators.level === 'Medium' ? 'text-yellow-800' :
                      'text-green-800'
                    }`}>
                      Risk Level: {report.crisisIndicators.level}
                    </span>
                  </div>
                  <p className="body-medium text-neutral-700">
                    {report.crisisIndicators.recommendations.join(' ')}
                  </p>
                </div>
              </div>
            )}

            {/* Topic Analysis */}
            {report.topicAnalysis && (
              <div>
                <h4 className="heading-small text-neutral-800 mb-3">Topic Analysis</h4>
                <div className="space-y-3">
                  <div>
                    <span className="body-small font-medium text-neutral-600">Primary Concerns:</span>
                    <p className="body-medium text-neutral-700 mt-1">
                      {report.topicAnalysis.primaryConcerns.join(', ')}
                    </p>
                  </div>
                  <div>
                    <span className="body-small font-medium text-neutral-600">Frequent Topics:</span>
                    <p className="body-medium text-neutral-700 mt-1">
                      {report.topicAnalysis.frequentTopics.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Communication Patterns */}
            <div>
              <h4 className="heading-small text-neutral-800 mb-3">Communication Patterns</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-50 rounded-lg p-4">
                  <span className="body-small font-medium text-neutral-600">Engagement Level</span>
                  <p className="body-medium text-neutral-700 mt-1">{report.communicationPatterns.engagementLevel}</p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-4">
                  <span className="body-small font-medium text-neutral-600">Communication Style</span>
                  <p className="body-medium text-neutral-700 mt-1">{report.communicationPatterns.communicationStyle}</p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="heading-small text-neutral-800 mb-3">Recommendations</h4>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {report.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="body-medium text-neutral-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Detailed Insights */}
            <div>
              <h4 className="heading-small text-neutral-800 mb-3">Detailed Insights</h4>
              <div className="bg-neutral-50 rounded-lg p-4">
                <p className="body-medium text-neutral-700">{report.summary.detailedInsights}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BehaviorReport;
