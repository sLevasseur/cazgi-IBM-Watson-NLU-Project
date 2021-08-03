const express = require('express');
const app = new express();
require('dotenv').config()

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());


function getNLUInstance() {
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2021-03-25',
    authenticator: new IamAuthenticator({
        apikey: process.env.API_KEY,
            }),
        serviceUrl: process.env.API_URL,
        });
    
    return naturalLanguageUnderstanding
}


app.get("/url/emotion", (req,res) => {

    const analyzeParamsEmotion = {
        'url': req.query.url,
        'features': {
            'emotion': {
            'limit': 5
            }
        }
    }
    
    getNLUInstance().analyze(analyzeParamsEmotion)
    .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    return res.send(analysisResults.result.emotion.document.emotion);
    })
    .catch(err => {
    console.log('error:', err);
    });
    
    //return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {

    const analyzeParamsSentiment = {
        'url': req.query.url,
        'features': {
            'sentiment': {
            }
        }
    }

    getNLUInstance().analyze(analyzeParamsSentiment)
    .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    return res.send(analysisResults.result.sentiment.document.label);
    })
    .catch(err => {
    console.log('error:', err);
    });

    //return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {

    const analyzeParamsEmotion = {
        'text': req.query.text,
        'features': {
            'emotion': {
            'limit': 5
            }
        }
    }

    getNLUInstance().analyze(analyzeParamsEmotion)
    .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    return res.send(analysisResults.result.emotion.document.emotion);
    })
    .catch(err => {
    console.log('error:', err);
    });

    //return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {

    const analyzeParamsSentiment = {
        'text': req.query.text,
        'features': {
            'sentiment': {
            }
        }
    }

    getNLUInstance().analyze(analyzeParamsSentiment)
    .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    return res.send(analysisResults.result.sentiment.document.label);
    })
    .catch(err => {
    console.log('error:', err);
    });

    //return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

