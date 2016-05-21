/**
 * @file 向导组件
 * @author Brian Li
 * @email lbxxlht@163.com
 * @version 0.0.2
 */
define(function (require) {


    var React = require('react');
    var InputWidget = require('./mixins/InputWidget');
    var util = require('./core/util');
    var cTools = require('./core/componentTools');


    return React.createClass({
        // @override
        mixins: [InputWidget],
        // @override
        getDefaultProps: function () {
            return {
                skin: '',
                className: '',
                style: {},
                disabled: false,
                datasource: [], // ['']
                valueTemplate: 0
            };
        },
        // @override
        getInitialState: function () {
            return {};
        },
        onClick: function (e) {
            if (this.props.disabled) return;
            var value = util.getDataset(e.target).uiCmd;
            if (isNaN(value)) return;
            e.target = this.refs.container;
            e.target.value = value;
            this.___dispatchChange___(e);
        },
        render: function () {
            return (<div {...cTools.containerBaseProps('wizard', this)}>{produceItems(this)}</div>);
        }
    });


    function produceItems(me) {
        if (!(me.props.datasource instanceof Array) || !me.props.datasource.length) return '';
        var doms = [];
        var value = me.___getValue___();
        value = isNaN(value) ? 0 : value * 1;
        for (var i = 0; i < me.props.datasource.length; i++) {
            var props = {
                key: i,
                className: 'fcui2-wizard-item',
                onClick: me.onClick,
                'data-ui-cmd': i,
                style: {
                    width: parseFloat(100 / me.props.datasource.length).toFixed(2) + '%',
                    zIndex: me.props.datasource.length - i
                }
            };
            if (me.props.disabled) {
                props.className += ' fcui2-wizard-disabled';
            }
            else if (i < value + 1) {
                props.className += ' fcui2-wizard-active';
            }
            doms.push(
                <div {...props}>
                    <span data-ui-cmd={i}>{me.props.datasource[i]}</span>
                    <div data-ui-cmd={i} className="fcui2-wizard-arrow-bg"></div>
                    <div data-ui-cmd={i} className="fcui2-wizard-arrow"></div>
                </div>
            );
        }
        return doms;
    }


});
