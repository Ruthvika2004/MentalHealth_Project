// Test crisis detection functionality
import { checkForEmergencyKeywords, checkForCrisisIndicators } from './chatService.js';

// Test function to verify crisis detection
export function testCrisisDetection() {
  console.log('🧪 Testing Crisis Detection...');
  
  const testPhrases = [
    "i will kill myself",
    "ill kill myself", 
    "i'll kill myself",
    "kill me again",
    "i wanna kill myself",
    "i want to kill myself",
    "i'm going to kill myself",
    "i'm feeling sad",
    "i'm extremely sad",
    "i feel hopeless"
  ];
  
  testPhrases.forEach(phrase => {
    const isEmergency = checkForEmergencyKeywords(phrase);
    const isCrisis = checkForCrisisIndicators(phrase);
    console.log(`"${phrase}" -> Emergency: ${isEmergency ? '🚨 YES' : '❌ No'}, Crisis: ${isCrisis ? '🚨 YES' : '❌ No'}`);
  });
  
  console.log('✅ Crisis detection test completed!');
  return true;
}

// Uncomment to run the test
// testCrisisDetection();