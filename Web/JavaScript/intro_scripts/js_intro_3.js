function ChangeWord (sentence, word) {
    let words = sentence.split(' ');

    hiddenWord = '';

    for (let j = 0; j < word.length; j++) {
        hiddenWord += '*';
    }

    for (let i = 0; i < words.length; i++) {
        if (words[i] === word) {
            words[i] = hiddenWord;
        }
    }

    let newSentence = words.join(' ');

    console.log(newSentence);
    console.log('The word is:', word);
}

ChangeWord('A small sentence with some small words.', 'small');
ChangeWord('Find the hidden word!', 'hidden');