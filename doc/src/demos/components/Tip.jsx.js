define(function (require) {


    var Creater = require('../Main.jsx');
    var Tip = require('fcui/Tip.jsx');
    var Button = require('fcui/Button.jsx');


    var items = [
        {
            title: 'Normal Tip',
            props: {title: 'It is tip\'s title', content: 'blablablabla'}
        },
        {
            title: 'Tip with Renderer',
            props: {
                title: 'It is tip\'s title',
                content: 'blablablabla',
                renderer: Button,
                renderProps:{value: 'Button in Tip'},
                layerLocation: '4',
                onOffset: function (result) {
                    result.left += 20;
                }
            }
        },
        {
            title: 'Tip with Icon',
            props: {title: 'It is tip\'s title', content: 'blablablabla', icon: 'font-icon-warning'}
        },
        {
            title: 'Tip with Style',
            props: {style: {color: 'green'}, title: 'It is tip\'s title', content: 'blablablabla'}
        },
        {
            title: 'Tip with ClassName',
            props: {className: 'colorRed', title: 'It is tip\'s title', content: 'blablablabla'}
        },
        {
            title: 'Tip without Title',
            props: {content: 'blablablabla'}
        },
        {
            title: 'Tip without Content',
            props: {title: 'It is tip\'s title'}
        },
        {
            title: 'Tip with html in Content',
            props: {title: 'It is tip\'s title', content: '<img width="300px" src="https://www.baidu.com/img/bd_logo1.png"/>'}
        },
        {
            title: 'Tip with empty props',
            props: {}
        }
    ];

    return Creater(Tip, items);
});
