/**
 * @file 组合控制列表组件
 * @author Brian Li
 * @email lbxxlht@163.com
 * @version 0.0.2
 */
define(function (require) {


    var React = require('react');
    var Layer = require('./Layer.jsx');
    var List = require('./List.jsx');
    var cTools = require('./core/componentTools');


    return React.createClass({
        // @override
        getDefaultProps: function () {
            return {
                skin: '',
                className: '',
                style: {},
                disabled: false,  
                label: 'ComboList',
                icon: '',
                value: '',
                datasource: [], // 见List
                onClick: function () {}
            };
        },
        // @override
        getInitialState: function () {
            return {
                layerOpen: false
            };
        },
        onListClick: function (e) {
            if (this.props.disabled) return;
            this.props.onClick(e);
            this.setState({layerOpen: false});  
        },
        onMainButtonClick: function (e) {
            if (this.props.disabled) return;
            e.target = this.refs.container;
            e.target.value = this.props.value;
            this.setState({layerOpen: false});
            this.props.onClick(e);
        },
        onDropDownButtonClick: function (e) {
            if (this.props.disabled) return;
            this.setState({layerOpen: true});
            e.stopPropagation();
        },
        onMouseLeave: function (e) {
            if (this.props.disabled) return;
            cTools.closeLayerHandler.call(this);
        },
        render: function () {
            var me = this;
            var containerProp = cTools.containerBaseProps('combolist', this, {
                merge: {
                    onMouseLeave: this.onMouseLeave,
                    onClick: this.onMainButtonClick
                }
            });
            var dropdownButtonProp = {
                className: 'icon-right font-icon font-icon-largeable-caret-down',
                style: {
                    backgroundColor: this.state.layerOpen ? '#FFF' : undefined,
                    color: this.state.layerOpen ? '#4593FF' : undefined,
                },
                onClick: this.onDropDownButtonClick
            };
            var layerProp = {
                ref: 'layer',
                isOpen: this.state.layerOpen && this.props.datasource.length && !this.props.disabled,
                anchor: this.refs.container,
                onMouseLeave: this.onMouseLeave,
                style: {
                    maxHeight: '240px',
                    overflow: 'auto'
                }
            };
            var listProp = {
                datasource: this.props.datasource,
                ref: 'list',
                onClick: this.onListClick
            };
            return (
                <div {...containerProp}>
                    <div {...dropdownButtonProp}></div>
                    <span>{this.props.label}</span>
                    <Layer {...layerProp}>
                        <List {...listProp}/>
                    </Layer>
                </div>
            );
        }
    });
});
