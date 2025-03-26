
export function getAdvancedResponse(userInput: string): string {
  // Convert to lowercase for easier pattern matching
  const input = userInput.toLowerCase().trim();
  
  // Check for greetings first
  if (isGreeting(input)) {
    const greetingResponses = [
      "Hello! How are you feeling today?",
      "Hi there! It's nice to hear from you. How has your day been?",
      "Hey! I'm here to chat. What's on your mind?",
      "Greetings! How can I support you today?",
      "Hello! I'm your mental health assistant. How are you doing right now?"
    ];
    return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
  }
  
  // Check for emotional patterns
  if (input.includes('sad') || input.includes('depressed') || input.includes('unhappy')) {
    return "I'm sorry to hear you're feeling down. Remember that it's okay to feel this way sometimes. Would it help to talk about what's causing these feelings?";
  } else if (input.includes('anxious') || input.includes('worried') || input.includes('stressed')) {
    return "Anxiety can be really challenging. Have you tried any breathing exercises or mindfulness techniques? Sometimes taking a few deep breaths can help in the moment.";
  } else if (input.includes('happy') || input.includes('great') || input.includes('good')) {
    return "I'm glad to hear you're feeling positive! What's been going well for you recently?";
  } else if (input.includes('tired') || input.includes('exhausted') || input.includes('sleep')) {
    return "Rest is so important for mental wellbeing. Have you been able to maintain a regular sleep schedule? Even small improvements in sleep quality can have big effects.";
  } else if (input.includes('angry') || input.includes('frustrated') || input.includes('mad')) {
    return "It sounds like you're feeling frustrated. Sometimes taking a short break from what's bothering you can help provide perspective. Would you like to talk more about what's causing these feelings?";
  } else if (input.includes('help') || input.includes('support') || input.includes('advice')) {
    return "I'm here to support you. While I'm not a replacement for professional help, I can listen and offer some guidance. What specific area would you like support with?";
  } else if (input.includes('thank') || input.includes('thanks')) {
    return "You're very welcome. I'm here whenever you need someone to talk to.";
  } else if (input.length < 10) {
    return "I'd love to hear more about that. Could you elaborate a bit so I can better understand what you're experiencing?";
  } else {
    // Generic supportive responses for inputs that don't match patterns
    const genericResponses = [
      "Thank you for sharing that with me. How does this situation affect your daily life?",
      "I understand. Have you noticed any patterns in when these feelings occur?",
      "That's important to acknowledge. How long have you been experiencing this?",
      "I appreciate you opening up. Is there a specific aspect of this that you find most challenging?",
      "I'm here to listen and support you. Would it help to explore some coping strategies for this?",
    ];
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  }
}

// Helper function to detect greetings
function isGreeting(input: string): boolean {
  const greetings = [
    'hi', 'hello', 'hey', 'howdy', 'greetings', 'good morning', 'good afternoon', 
    'good evening', 'what\'s up', 'sup', 'yo', 'hiya', 'hi there', 'hello there'
  ];
  
  return greetings.some(greeting => 
    input === greeting || 
    input.startsWith(greeting + ' ') || 
    input.endsWith(' ' + greeting)
  );
}
