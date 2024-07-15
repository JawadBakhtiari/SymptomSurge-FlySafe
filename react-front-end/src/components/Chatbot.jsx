import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';
const API_KEY = 'sk-proj-0QhJF49MZoDAJ9Hy4llfT3BlbkFJfSIjaqlBUo3cFCkhmIbw';

/* Create the main Dashboard for the page with notifications, financial statistics */
export const Chatbot = () => {
  const [chat, setChat] = useState(false);

  // Chat
  const [messages, setMessages] = useState([
    {
      message:
        "Hello! I'm your assistant for Fly Safe. How can I help you today?",
      sentTime: 'just now',
      sender: 'Symptom Surge',
      direction: 'incoming',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // To send to CHAT GPT on click and wait for the reply.
  const handleSend = async (text) => {
    const userMessage = {
      message: text,
      direction: 'outgoing',
      sender: 'user',
    };

    setMessages([...messages, userMessage]);
    setIsTyping(true);

    await processMessageToChatGPT([...messages, userMessage]);
  };

  const dataSet = {
    "disease outbreaks": [
      {
        "outbreak": {
          "Outbreak name": "Nipah virus infection",
          "Date Reported": "27 February 2024",
          "Location": "Bangladesh",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Middle East Respiratory Syndrome Coronavirus",
          "Date Reported": "16 February 2024",
          "Location": "Kingdom of Saudi Arabia",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Avian Influenza A(H10N5) and Influenza A(H3N2) coinfection",
          "Date Reported": "13 February 2024",
          "Location": "China",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Influenza A(H1N1) variant virus",
          "Date Reported": "9 February 2024",
          "Location": "Spain",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Western Equine Encephalitis",
          "Date Reported": "8 February 2024",
          "Location": "Uruguay",

        }
      },
      {
        "outbreak": {
          "Outbreak name": "Avian Influenza A (H5N1)",
          "Date Reported": "8 February 2024",
          "Location": "Cambodia"
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Influenza A (H1N1) variant virus",
          "Date Reported": "7 February 2024",
          "Location": "Brazil",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Western equine encephalitis",
          "Date Reported": "28 December 2023",
          "Location": "Argentina",

        }
      },
      {
        "outbreak": {
          "Outbreak name": "Dengue",
          "Date Reported": "21 December 2023",
          "Location": "Global situation",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Anthrax",
          "Date Reported": "8 December 2023",
          "Location": "Zambia",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Influenza A(H1N2) variant virus infection",
          "Date Reported": "1 December 2023",
          "Location": "United Kingdom of Great Britain and Northern Ireland",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Avian Influenza A (H5N1)",
          "Date Reported": "29 November 2023",
          "Location": "Cambodia",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Upsurge of respiratory illnesses among children",
          "Date Reported": "23 November 2023",
          "Location": "Northern China",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Mpox (monkeypox)",
          "Date Reported": "23 November 2023",
          "Location": "Democratic Republic of the Congo",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Diphtheria",
          "Date Reported": "18 October 2023",
          "Location": "Guinea",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Dengue",
          "Date Reported": "16 October 2023",
          "Location": "Chad",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Nipah virus infection",
          "Date Reported": "3 October 2023",
          "Location": "India",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Suspected triple outbreak of typhoid fever, shigellosis and cholera",
          "Date Reported": "21 September 2023",
          "Location": "Congo",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Legionellosis",
          "Date Reported": "14 September 2023",
          "Location": "Poland",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Diphtheria",
          "Date Reported": "13 September 2023",
          "Location": "Nigeria",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Influenza A (H1N1) variant virus",
          "Date Reported": "13 September 2023",
          "Location": "the Netherlands",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Middle East respiratory syndrome coronavirus",
          "Date Reported": "29 August 2023",
          "Location": "Saudi Arabia",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Measles",
          "Date Reported": "23 August 2023",
          "Location": "Chile",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Influenza A (H1N2) variant virus",
          "Date Reported": "11 August 2023",
          "Location": "United States of America",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Dengue",
          "Date Reported": "11 August 2023",
          "Location": "Bangladesh",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Middle East respiratory syndrome coronavirus",
          "Date Reported": "24 July 2023",
          "Location": "United Arab Emirates",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Dengue",
          "Date Reported": "19 July 2023",
          "Location": "the Region of the Americas",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Influenza A(H5N1) in cats",
          "Date Reported": "16 July 2023",
          "Location": "Poland",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Influenza A H1N1 variant virus",
          "Date Reported": "16 June 2023",
          "Location": "Brazil",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Marburg virus disease",
          "Date Reported": "9 June 2023",
          "Location": "Equatorial Guinea",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Marburg virus disease",
          "Date Reported": "2 June 2023",
          "Location": "United Republic of Tanzania",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Outbreak of suspected fungal meningitis associated with surgical procedures performed under spinal anaesthesia",
          "Date Reported": "1 June 2023",
          "Location": "the United States of America and Mexico",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Enterovirus Infection",
          "Date Reported": "31 May 2023",
          "Location": "France",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Myocarditis",
          "Date Reported": "17 May 2023",
          "Location": "United Kingdom of Great Britain and Northern Ireland",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Marburg virus disease",
          "Date Reported": "8 May 2023",
          "Location": "Equatorial Guinea and the United Republic of Tanzania",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Acute hepatitis E",
          "Date Reported": "5 May 2023",
          "Location": "South Sudan",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Measles",
          "Date Reported": "4 May 2023",
          "Location": "Ethiopia",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Lassa fever",
          "Date Reported": "1 May 2023",
          "Location": "Nigeria",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Measles",
          "Date Reported": "28 April 2023",
          "Location": "Indonesia",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Diphtheria",
          "Date Reported": "27 April 2023",
          "Location": "Nigeria",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Meningitis",
          "Date Reported": "27 April 2023",
          "Location": "Nigeria",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Human Infection caused by Avian Influenza A (H5N1)",
          "Date Reported": "21 April 2023",
          "Location": "Chile",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Marburg virus disease",
          "Date Reported": "15 April 2023",
          "Location": "Equatorial Guinea",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Avian Influenza A(H3N8)",
          "Date Reported": "11 April 2023",
          "Location": "China",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Pneumococcal meningitis",
          "Date Reported": "11 April 2023",
          "Location": "Togo",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Human infection caused by Avian Influenza A (H5)",
          "Date Reported": "6 April 2023",
          "Location": "Chile",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Iatrogenic Botulism",
          "Date Reported": "24 March 2023",
          "Location": "European Region",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Marburg virus disease",
          "Date Reported": "24 March 2023",
          "Location": "United Republic of Tanzania",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Marburg virus disease",
          "Date Reported": "22 March 2023",
          "Location": "Equatorial Guinea",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Measles",
          "Date Reported": "14 March 2023",
          "Location": "Nepal",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Avian Influenza A (H5N1)",
          "Date Reported": "26 February 2023",
          "Location": "Cambodia",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Marburg virus disease",
          "Date Reported": "25 February 2023",
          "Location": "Equatorial Guinea",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Cholera",
          "Date Reported": "24 February 2023",
          "Location": "Mozambique",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Nipah virus infection",
          "Date Reported": "17 February 2023",
          "Location": "Bangladesh",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Cholera",
          "Date Reported": "11 February 2023",
          "Location": "Global situation",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Measles",
          "Date Reported": "10 February 2023",
          "Location": "South Sudan",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Cholera",
          "Date Reported": "10 February 2023",
          "Location": "Democratic Republic of the Congo",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Cholera",
          "Date Reported": "9 February 2023",
          "Location": "Malawi",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Middle East respiratory syndrome coronavirus",
          "Date Reported": "8 February 2023",
          "Location": "Oman",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Meningitis",
          "Date Reported": "8 February 2023",
          "Location": "Niger",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Measles",
          "Date Reported": "2 February 2023",
          "Location": "Paraguay",
        }
      }, {
        "outbreak": {
          "Outbreak name": "Human infection caused by avian influenza A(H5)",
          "Date Reported": "18 January 2023",
          "Location": "Ecuador",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Ebola disease caused by Sudan ebolavirus",
          "Date Reported": "14 January 2023",
          "Location": "Uganda",
        }
      },
      {
        "outbreak": {
          "Outbreak name": "Yellow fever",
          "Date Reported": "3 January 2023",
          "Location": "African Region (AFRO)",
        }
      }
    ]
  }

  const predictedDatesDataSet = {"predicted_dates": {'Afghanistan': '15 July 2024', 'Åland Islands': 'Date cannot be predicted', 'Albania': '21 September 2026', 'Algeria': '16 October 2024', 'American Samoa': '29 March 2030', 'Andorra': 'Date cannot be predicted', 'Angola': '18 August 2024', 'Anguilla': 'Date cannot be predicted', 'Antarctica': 'Date cannot be predicted', 'Antigua and Barbuda': '16 May 2024', 'Argentina': '07 July 2024', 'Armenia': '19 October 2027', 'Aruba': '18 May 2024', 'Australia': '24 August 2024', 'Austria': '25 June 2024', 'Azerbaijan': '06 August 2024', 'Bahamas': '07 April 2025', 'Bahrain': '02 February 2025', 'Bangladesh': '02 August 2024', 'Barbados': '08 June 2024', 'Belarus': 'Date cannot be predicted', 'Belgium': '21 July 2024', 'Belize': '12 May 2027', 'Benin': '14 July 2024', 'Bermuda': '15 May 2024', 'Bhutan': '05 July 2025', 'Bolivia': '04 November 2024', 'Bosnia and Herzegovina': '19 December 2030', 'Botswana': '29 June 2024', 'Bouvet Island': 'Date cannot be predicted', 'Brazil': '12 August 2024', 'British Indian Ocean Territory': 'Date cannot be predicted', 'Brunei Darussalam': '24 May 2024', 'Bulgaria': '02 August 2024', 'Burkina Faso': '16 June 2024', 'Burundi': '14 June 2025', 'Cambodia': '01 August 2024', 'Cameroon': '16 August 2024', 'Canada': '17 July 2024', 'Cape Verde': '21 December 2031', 'Cayman Islands': '15 May 2024', 'Central African Republic': '02 October 2024', 'Chad': '22 June 2024', 'Chile': '07 August 2024', 'China': '27 May 2024', 'Christmas Island': 'Date cannot be predicted', 'Cocos (Keeling) Islands': 'Date cannot be predicted', 'Colombia': '07 August 2024', 'Comoros': '26 September 2024', 'Congo': '17 May 2024', 'Congo, The Democratic Republic of the': 'Date cannot be predicted', 'Cook Islands': '03 March 2025', 'Costa Rica': '06 September 2024', "Cote D'Ivoire": 'Date cannot be predicted', 'Croatia': '12 March 2026', 'Cuba': '08 July 2024', 'Cyprus': '17 October 2025', 'Czech Republic': '06 August 2024', 'Denmark': '05 August 2024', 'Djibouti': '28 June 2030', 'Dominica': '25 June 2024', 'Dominican Republic': '21 July 2024', 'Ecuador': '22 May 2025', 'Egypt': '03 July 2024', 'El Salvador': '13 June 2024', 'Equatorial Guinea': '05 February 2025', 'Eritrea': '16 December 2031', 'Estonia': '07 June 2024', 'Ethiopia': '08 August 2024', 'Falkland Islands (Malvinas)': 'Date cannot be predicted', 'Faroe Islands': 'Date cannot be predicted', 'Fiji': '16 April 2026', 'Finland': '11 July 2024', 'France': '31 May 2024', 'French Guiana': '19 February 2026', 'French Polynesia': '15 May 2024', 'French Southern Territories': 'Date cannot be predicted', 'Gabon': '28 May 2024', 'Gambia': '03 March 2025', 'Georgia': '25 August 2024', 'Germany': '03 June 2024', 'Ghana': '12 September 2024', 'Gibraltar': 'Date cannot be predicted', 'Greece': '09 October 2024', 'Greenland': 'Date cannot be predicted', 'Grenada': 'Date cannot be predicted', 'Guadeloupe': '12 February 2030', 'Guam': '03 November 2031', 'Guatemala': '11 August 2024', 'Guernsey': '18 May 2024', 'Guinea': '11 July 2024', 'Guinea-Bissau': '10 April 2025', 'Guyana': '19 January 2028', 'Haiti': '24 November 2024', 'Heard Island and Mcdonald Islands': 'Date cannot be predicted', 'Holy See (Vatican City State)': 'Date cannot be predicted', 'Honduras': '12 November 2024', 'Hong Kong': '11 June 2024', 'Hungary': '24 July 2024', 'Iceland': '25 May 2024', 'India': '13 June 2024', 'Indonesia': '28 June 2024', 'Iran, Islamic Republic Of': 'Date cannot be predicted', 'Iraq': '24 December 2024', 'Ireland': '03 August 2024', 'Isle of Man': '15 May 2024', 'Israel': '27 May 2024', 'Italy': '18 September 2024', 'Jamaica': '01 February 2025', 'Japan': '29 May 2024', 'Jersey': '22 August 2024', 'Jordan': '15 June 2024', 'Kazakhstan': '25 April 2025', 'Kenya': '17 September 2024', 'Kiribati': 'Date cannot be predicted', "Korea, Democratic People'S Republic of": 'Date cannot be predicted', 'Korea, Republic of': '19 May 2024', 'Kuwait': '20 June 2024', 'Kyrgyzstan': '22 November 2024', "Lao People'S Democratic Republic": 'Date cannot be predicted', 'Latvia': '16 May 2024', 'Lebanon': '08 January 2025', 'Lesotho': '08 December 2028', 'Liberia': '20 June 2024', 'Libyan Arab Jamahiriya': '18 May 2024', 'Liechtenstein': 'Date cannot be predicted', 'Lithuania': '26 May 2024', 'Luxembourg': '15 September 2024', 'Macao': '08 May 2027', 'Macedonia, The Former Yugoslav Republic of': 'Date cannot be predicted', 'Madagascar': '26 July 2024', 'Malawi': '06 September 2024', 'Malaysia': '05 June 2024', 'Maldives': '27 December 2024', 'Mali': '07 June 2024', 'Malta': '18 May 2024', 'Marshall Islands': 'Date cannot be predicted', 'Martinique': '10 February 2025', 'Mauritania': '05 December 2025', 'Mauritius': '16 July 2027', 'Mayotte': '08 July 2027', 'Mexico': '04 June 2024', 'Micronesia, Federated States of': 'Date cannot be predicted', 'Moldova, Republic of': 'Date cannot be predicted', 'Monaco': '17 May 2024', 'Mongolia': '10 July 2024', 'Montserrat': 'Date cannot be predicted', 'Morocco': '16 January 2025', 'Mozambique': '01 September 2024', 'Myanmar': '17 October 2025', 'Namibia': '08 July 2028', 'Nauru': '13 December 2024', 'Nepal': '10 February 2025', 'Netherlands': '05 August 2024', 'Netherlands Antilles': '19 May 2024', 'New Caledonia': '06 July 2025', 'New Zealand': '11 September 2024', 'Nicaragua': '07 December 2024', 'Niger': '22 June 2024', 'Nigeria': '19 May 2024', 'Niue': 'Date cannot be predicted', 'Norfolk Island': 'Date cannot be predicted', 'Northern Mariana Islands': 'Date cannot be predicted', 'Norway': '17 August 2024', 'Oman': '04 August 2024', 'Pakistan': '16 August 2024', 'Palau': '18 May 2024', 'Palestinian Territory, Occupied': 'Date cannot be predicted', 'Panama': '27 June 2024', 'Papua New Guinea': '10 July 2024', 'Paraguay': '15 August 2025', 'Peru': '19 September 2024', 'Philippines': '06 August 2024', 'Pitcairn': 'Date cannot be predicted', 'Poland': '10 September 2024', 'Portugal': '12 August 2024', 'Puerto Rico': '25 July 2030', 'Qatar': '24 July 2024', 'Reunion': 'Date cannot be predicted', 'Romania': '21 May 2024', 'Russian Federation': '17 November 2024', 'RWANDA': 'Date cannot be predicted', 'Saint Helena': 'Date cannot be predicted', 'Saint Kitts and Nevis': 'Date cannot be predicted', 'Saint Lucia': '16 May 2025', 'Saint Pierre and Miquelon': 'Date cannot be predicted', 'Saint Vincent and the Grenadines': '10 May 2029', 'Samoa': '13 March 2025', 'San Marino': 'Date cannot be predicted', 'Sao Tome and Principe': '10 September 2028', 'Saudi Arabia': '14 June 2024', 'Senegal': '27 May 2024', 'Serbia and Montenegro': 'Date cannot be predicted', 'Seychelles': '01 August 2026', 'Sierra Leone': '02 August 2024', 'Singapore': '18 June 2024', 'Slovakia': '20 May 2024', 'Slovenia': '15 December 2024', 'Solomon Islands': 'Date cannot be predicted', 'Somalia': '12 November 2024', 'South Africa': '11 June 2024', 'South Georgia and the South Sandwich Islands': 'Date cannot be predicted', 'Spain': '24 June 2024', 'Sri Lanka': '01 October 2024', 'Sudan': '06 June 2024', 'Suriname': '14 February 2025', 'Svalbard and Jan Mayen': 'Date cannot be predicted', 'Swaziland': '03 February 2025', 'Sweden': '18 July 2024', 'Switzerland': '21 July 2024', 'Syrian Arab Republic': '16 October 2027', 'Taiwan, Province of China': '14 October 2024', 'Tajikistan': '11 June 2028', 'Tanzania, United Republic of': 'Date cannot be predicted', 'Thailand': '26 June 2024', 'Timor-Leste': 'Date cannot be predicted', 'Togo': '23 July 2024', 'Tokelau': 'Date cannot be predicted', 'Tonga': '22 June 2025', 'Trinidad and Tobago': '07 September 2024', 'Tunisia': '20 October 2024', 'Turkey': '04 October 2024', 'Turkmenistan': 'Date cannot be predicted', 'Turks and Caicos Islands': 'Date cannot be predicted', 'Tuvalu': 'Date cannot be predicted', 'Uganda': '26 June 2024', 'Ukraine': '11 October 2024', 'United Arab Emirates': '31 May 2024', 'United Kingdom': '12 June 2024', 'United States': '17 May 2024', 'United States Minor Outlying Islands': 'Date cannot be predicted', 'Uruguay': '11 May 2025', 'Uzbekistan': '29 December 2024', 'Vanuatu': '21 June 2024', 'Venezuela': '16 September 2024', 'Viet Nam': '23 May 2024', 'Virgin Islands, British': 'Date cannot be predicted', 'Virgin Islands, U.S.': 'Date cannot be predicted', 'Wallis and Futuna': 'Date cannot be predicted', 'Western Sahara': 'Date cannot be predicted', 'Yemen': '03 September 2024', 'Zambia': '19 March 2025', 'Zimbabwe': '13 April 2025'}}

  // Proccesses the messages for the ChatGPT assistant to understand using CHAT GPT API
  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = '';
      if (messageObject.sender === 'ChatGPT') {
        role = 'assistant';
      } else {
        role = 'user';
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: "system", content: `You are given this dataset about disease outbreaks, organised in chronological order: ${JSON.stringify(dataSet)}. Use this dataset to answer any disease outbreak releated questions.` },
        { role: "system", content: `You are given this dataset about predicted dates, organised in alphabetical order by country: ${JSON.stringify(predictedDatesDataSet)}. Use this dataset to answer any predicted outbreak related questions.` },
        { role: "user", content: "Can you tell me more information?" },
        { role: "assistant", content: "More information can be found by looking at the specific country page by choosing the country from the drop down and clicking Let's Fly!" },
        { role: "user", content: "How big is the dataset?" },
        { role: "assistant", content: "The dataset contains disease information from 2023 until present day." },
        { role: "user", content: "Who are you?" },
        { role: "assistant", content: "I am a travel assistant for Fly Safe that deals with health data and helps you with your health queries with travel." },
        { role: "user", content: "How do I check information for a country?" },
        { role: "assistant", content: "Choose the country from the drop down and click Let's Fly!" },
        { role: "user", content: "How do I check information for Australia?" },
        { role: "assistant", content: "Choose Australia from the drop down and click Let's Fly!" },
        { role: "user", content: "How do I check information for China?" },
        { role: "assistant", content: "Choose China from the drop down and click Let's Fly!" },
        { role: "user", content: "What is Situation at a Glance?" },
        { role: "assistant", content: "It is a summary of the events of the disease outbreak." },
        { role: "user", content: "What are Symptoms?" },
        { role: "assistant", content: "These are the symptoms for the particular disease." },
        { role: "user", content: "What is Risk Assessment?" },
        { role: "assistant", content: "These are the risks that the disease poses." },
        { role: "user", content: "What is Public Health Response?" },
        { role: "assistant", content: "These are the measures that the country has taken to control the disease." },
        { role: "user", content: "What is WHO Advice?" },
        { role: "assistant", content: "This is the advice that WHO advises you to follow to reduce risk of infection." }, ...apiMessages],
    };
    console.log(apiRequestBody);
    await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: 'ChatGPT',
            direction: 'incoming',
          },
        ]);
        setIsTyping(false);
      });
  }

  // Chatbot interface.
  return (
    <>
      {!chat ? (
        <IoChatbubbleEllipsesOutline
          className='chat-btn'
          style={{
            position: 'fixed',
            bottom: '15px',
            right: '20px',
            height: '60px',
            width: '60px',
            transform: 'scaleX(-1)',
          }}
          onClick={() => setChat(true)}
        />
      ) : (
        <div className='chat'>
          <div
            style={{
              position: 'fixed',
              bottom: '80px',
              right: '20px',
              height: '500px',
              width: '450px',
            }}
          >
            <MainContainer>
              <ChatContainer>
                <MessageList
                  typingIndicator={
                    isTyping && <TypingIndicator content='FlySafe Bot is typing' />
                  }
                >
                  {messages.map((msg, index) => (
                    <Message
                      key={index}
                      className='text-box'
                      model={{
                        message: msg.message,
                        direction: msg.direction,
                        position: 'single',
                      }}
                    />
                  ))}
                </MessageList>
                <MessageInput
                  className='text-box'
                  placeholder='Type message here...'
                  onSend={handleSend}
                />
              </ChatContainer>
            </MainContainer>
          </div>
          <IoChatbubbleEllipsesSharp
            className='chat-btn'
            style={{
              position: 'fixed',
              bottom: '15px',
              right: '20px',
              height: '60px',
              width: '60px',
              transform: 'scaleX(-1)',
            }}
            onClick={() => setChat(false)}
          />
        </div>
      )}
    </>
  );
};

export default Chatbot;