/**
 * @file 单选框组件
 * @author Brian Li
 * @email lbxxlht@163.com
 * @version 0.0.1
 */
define(function (require) {


    var React = require('react');
    var InputWidgetBase = require('./mixins/InputWidgetBase');
    var InputWidgetInForm = require('./mixins/InputWidgetInForm');


    return React.createClass({
        // @override
        mixins: [InputWidgetBase, InputWidgetInForm],
        // @override
        getDefaultProps: function () {
            return {
                ___uitype___: 'radio',
                className: '',
                label: '',
                value: '',
                labelPosition: 'left',
                disabled: false,
                valueTemplate: false
            };
        },
        // @override
        getInitialState: function () {
            return {};
        },
        clickHandler: function (e) {
            if (this.props.disabled) return;
            e.target = this.refs.inputbox;
            if (!e.target.checked) {
                e.target.checked = !e.target.checked;
                this.___dispatchChange___(e);
            }
        },
        changeHandler: function (e) {
            if (this.props.disabled) return;
            this.___dispatchChange___(e);
        },
        render: function () {
            var containerProp = {
                className: 'fcui2-checkbox ' + this.props.className,
            };
            var labelProp = {
                className: 'fcui2-checkbox-label',
                onClick: this.clickHandler
            };
            var inputProp = {
                type: 'radio',
                name: this.props.name, // radio 跟其他input组件不一样，它需要用name控制单选，所以这个属性要下传
                value: this.props.value,
                checked: this.___getValue___(),
                onChange: this.changeHandler
            };
            this.___mergeInputHandlers___(inputProp, this.props);
            if (this.props.disabled) {
                containerProp.className += ' fcui2-checkbox-disabled';
            }
            else if (this.state.isValid === false) {
                containerProp.className += ' fcui2-checkbox-reject';
            }
            var doms = [];
            doms.push(<input {...inputProp} disabled={this.props.disabled} ref="inputbox" key="input"/>);
            doms[this.props.labelPosition === 'right' ? 'push' : 'unshift'](
                <span {...labelProp} key="label">{this.props.label}</span>
            );
            return (<div {...containerProp}>{doms}</div>);
        }
    });
});
