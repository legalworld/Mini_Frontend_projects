# AI Chatbot 💬

A modern, interactive AI chatbot interface built with vanilla JavaScript, HTML, and CSS. Features real-time conversation with Google's Gemini AI, image upload support, and a sleek chat interface.

## ✨ Features

- **Real-time Chat**: Interactive conversation with AI powered by Google Gemini
- **Image Upload**: Send images along with text messages for AI analysis
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Rate Limiting**: Built-in protection against API rate limits
- **Smooth Animations**: Loading states and smooth scrolling
- **Modern UI**: Clean, chat-like interface with user/AI avatars

## 🚀 Demo

![Chatbot Demo](assets/demo.gif)

*Demo shows the chatbot in action with text and image interactions*

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **API**: Google Gemini AI (Gemini 3 Flash Preview)
- **File Handling**: FileReader API for image uploads
- **Styling**: CSS3 with Flexbox, animations, and media queries

## 📁 Project Structure

```
39_AI_chatBot/
├── assets/
│   ├── ai.png          # AI avatar
│   ├── user.png        # User avatar
│   ├── image.svg       # Image upload icon
│   ├── send.svg        # Send button icon
│   └── loading.gif     # Loading animation
├── index.html          # Main HTML structure
├── style.css           # Complete styling
├── script.js           # Core JavaScript functionality
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- A web browser (Chrome, Firefox, Safari, Edge)
- Google Gemini API key (optional for demo)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/39_AI_chatBot.git
   cd 39_AI_chatBot
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your preferred browser
   open index.html
   ```

### API Configuration (Optional)

For full functionality, you'll need a Google Gemini API key:

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Replace the placeholder in `script.js`:
   ```javascript
   const api_key = "your_actual_api_key_here";
   ```

**Note**: The project works as a demo without an API key, showing the interface and interactions.

## 🎯 Usage

### Basic Chat
1. Type your message in the input field
2. Press **Enter** or click the **Send** button
3. Wait for the AI response

### Image Upload
1. Click the **image icon** in the prompt area
2. Select an image from your device
3. The image preview will appear
4. Type your message and send
5. AI will analyze both text and image

### Features
- **Enter Key**: Send messages quickly
- **Image Preview**: See selected images before sending
- **Loading States**: Visual feedback during API calls
- **Auto-scroll**: Chat automatically scrolls to latest messages
- **Rate Limiting**: 15-second cooldown when API limits are hit

## 🔧 Configuration

### API Settings
```javascript
// In script.js
const api_key = "Enter_Your_api_key_here";  // Replace with your key
const api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";
```

### Customization
- **Colors**: Modify CSS variables in `style.css`
- **Fonts**: Change font family in CSS reset
- **Avatars**: Replace images in `assets/` folder
- **API Model**: Update `api_url` for different Gemini models

## 🎨 Design Features

### UI Components
- **Chat Bubbles**: Rounded message containers with shadows
- **Avatars**: User and AI profile images
- **Input Area**: Modern text input with action buttons
- **Responsive Layout**: Adapts to different screen sizes

### CSS Highlights
- Flexbox for layout structure
- CSS animations for smooth transitions
- Media queries for mobile responsiveness
- Drop shadows and border-radius for modern look
- Hover effects on interactive elements

### JavaScript Features
- Async/await for API calls
- Event listeners for user interactions
- FileReader API for image handling
- Dynamic DOM manipulation
- Error handling and rate limiting

## 🐛 Troubleshooting

### Common Issues

**API Key Errors**
- Ensure your API key is valid and active
- Check if you've exceeded rate limits
- Verify the API endpoint URL

**Image Upload Issues**
- Ensure images are in supported formats (JPG, PNG, GIF)
- Check file size limits
- Verify browser supports FileReader API

**Display Issues**
- Clear browser cache
- Check browser compatibility
- Verify all asset files are present

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🔒 Security Notes

- **API Keys**: Never expose real API keys in frontend code for production
- **File Upload**: Images are processed client-side only
- **Demo Mode**: Safe to share without API keys

## 🚀 Future Enhancements

- [ ] Voice input/output support
- [ ] Message history persistence
- [ ] Multiple AI model support
- [ ] Dark/light theme toggle
- [ ] Export chat conversations
- [ ] Emoji support
- [ ] Typing indicators

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

Created by [@legalworld](https://github.com/legalworld)

If you have any questions or feedback, feel free to reach out!

---

**⭐ If you like this project, please give it a star!**
