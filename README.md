# REVISE50

#### Video Demo:

#### Description:

REVISE50 is a website that allows users to go over all content learnt in CS50 by doing multiple questions. There are 3 questions per week and their difficulty ranges from easy to hard in order cover a wider range of content. 

The whole project includes 'app.py' written in python to render our templates and 'index.html' to design the layout of the webpage, also 'style.css' for a personalized styling. We adopted the use of AJAX rather than creating a database in order to save running time and improve managerial efficiencies. Also, we writes the questions file in a format called 'YAML', which is way more readable and easy to write compared to csv files.

The theme of the webpage is organized around the color 'pink', we also have two modes for users to switch in case at night they prefer dark mode. We also spend time designing animation of the buttons so the whole process of revising becomes more engaging and relaxing.

When users get access to revise50, we render the index.html first to display the page. We display questions to users base on question ids and the range of ids is passed into index.html at the same time when we call render-templates. In index.js, the main building blocks are a few functions: 'the toggleTheme' allows users to switch to another mode when clicking the sun/moon icon, and this is achived mainly through 'addEventListener' on the button. 'createButton' helps display a tick next to the right answer and crosses next the other wrong answers when the user has clicked to choose their answer. This process is done mainly via 'appendChild' which will append a correct or incorrect icon according to the option they click. 'setQuestionDescription' enables question with certain id to be displayed; 'shuffle' will shuffle the position of options in each question so users won't be able to guess the pattern of the answers. 'showQuestion' is a function specifying how question with options are displayed on the screen; also, it disables all buttons once users have clicked a choice so it means that users can't make repeated choices or rechoose. Also, we reserve time for users to check correct answers or if they have chosen correctly, after the set time, the question will be cleaned up a new question will be displayed.

A random number generator in Javascript is used for generating question ids, and we also remove the done question ids from the list so no repititions of questions will occur which could improve users' revision experience. At the end, when users finish all the prepared questions, we will display a webpage telling them about their performance (percentage of correctness), the LOGO below is a personalized LOGO of mine! I have a cute little cat, a large shark and a mini lamb with me. And I am the lucky pig!

