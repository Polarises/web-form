import React, { useState, useRef } from 'react';
import Generator from 'fr-generator';
import { Button, Modal, Input } from 'antd';
import FormRender, { useForm } from 'form-render';

const { TextArea } = Input;
const { Provider, Sidebar, Canvas, Settings } = Generator;

const defaultValue = {

};

let objData = {};
let submitData = {};

const stringContains = (str, text) => {
    return str.indexOf(text) > -1;
};

const isObject = a =>
    stringContains(Object.prototype.toString.call(a), 'Object');

// 获得 propsSchema 的 children
const getChildren2 = schema => {
    if (!schema) return [];
    const {
        // object
        properties,
        // array
        items,
        type,
    } = schema;
    if (!properties && !items) {
        return [];
    }
    let schemaSubs = {};
    if (type === 'object') {
        schemaSubs = properties;
    }
    if (type === 'array') {
        schemaSubs = items.properties;
    }
    return Object.keys(schemaSubs).map(name => ({
        schema: schemaSubs[name],
        name,
    }));
};

// formily Schema => FRG schema
const transformFrom = (mySchema, parent = null) => {
    const isObj = mySchema.type === 'object' && mySchema.properties;
    const isList =
        mySchema.type === 'array' && mySchema.items && mySchema.items.properties;
    const hasChildren = isObj || isList;
    // debugger;
    if (!hasChildren) {
        if (mySchema.enum && Array.isArray(mySchema.enum)) {
            const list = mySchema.enum;
            if (
                isObject(list[0]) &&
                list[0].label !== undefined &&
                list[0].value !== undefined
            ) {
                const _enumNames = list.map(i => i.label);
                const _enum = list.map(i => i.value);
                mySchema.enum = _enum;
                mySchema.enumNames = _enumNames;
            }
        }
    } else {
        const childrenList = getChildren2(mySchema);
        childrenList.map(item => {
            if (isObj) {
                mySchema.properties[item.name] = transformFrom(item.schema, mySchema);
            }
            if (isList) {
                mySchema.items.properties[item.name] = transformFrom(
                    item.schema,
                    mySchema
                );
            }
        });
    }
    if (mySchema['x-component']) {
        mySchema['widget'] = mySchema['x-component'];
    }
    if (mySchema['x-component-props']) {
        mySchema['props'] = mySchema['x-component-props'];
    }
    if (parent && mySchema.required) {
        if (parent.required && Array.isArray(parent.required)) {
            parent.required.push(mySchema.name);
        } else {
            parent.required = [mySchema.name];
        }
    }
    delete mySchema.key;
    delete mySchema.name;
    delete mySchema.required;
    delete mySchema['x-component'];
    delete mySchema['x-component-props'];
    return mySchema;
};

// FRG schema => formily Schema
const transformTo = (frSchema, parent = null, key = null) => {
    const isObj = frSchema.type === 'object' && frSchema.properties;
    const isList =
        frSchema.type === 'array' && frSchema.items && frSchema.items.properties;
    const hasChildren = isObj || isList;
    // debugger;
    if (!hasChildren) {
        if (
            frSchema.enum &&
            Array.isArray(frSchema.enum) &&
            frSchema.enumNames &&
            Array.isArray(frSchema.enumNames)
        ) {
            const list = frSchema.enum.map((item, idx) => ({
                value: item,
                label: frSchema.enumNames[idx],
            }));
            frSchema.enum = list;
        }
    } else {
        const childrenList = getChildren2(frSchema);
        childrenList.map(item => {
            if (isObj) {
                frSchema.properties[item.name] = transformTo(
                    item.schema,
                    frSchema,
                    item.name
                );
            }
            if (isList) {
                frSchema.items.properties[item.name] = transformTo(
                    item.schema,
                    frSchema,
                    item.name
                );
            }
        });
    }
    if (frSchema['widget']) {
        frSchema['x-component'] = frSchema['widget'];
    }
    if (frSchema['props']) {
        frSchema['x-component-props'] = frSchema['props'];
    }
    delete frSchema['widget'];
    delete frSchema['props'];
    delete frSchema['enumNames'];
    if (key) {
        frSchema.name = key;
        frSchema.key = key;
    }
    if (parent && key && parent.required && Array.isArray(parent.required)) {
        if (parent.required.indexOf(key) > -1) {
            frSchema.required = true;
        }
    }
    return frSchema;
};

const fromFormily = schema => transformFrom(schema);
const toFormily = schema => transformTo(schema);

const Demo = (props) => {
    const [show, setShow] = useState(false);
    const [schema, setSchema] = useState(() => defaultValue);
    const genRef = useRef(); // class组件用 React.createRef()

    const toggle = () => setShow(o => !o);
    if (props.showFormVisible && !show) {
        objData = props.defaultValue && props.defaultValue.schemas || {};
    } else if (props.showFormVisible && show) {
        props.onCancel && props.onCancel()
    }
    const handleOk = () => {
        const value = genRef.current && genRef.current.getValue();
        setSchema(value);
        // toggle();
        props.onSubmit && props.onSubmit({value, submitData})
    };
    const handleChange = (data) => {
        submitData = data
    }
    const form = useForm();
    const onFinish = (formData, errors) => {
        console.log('formData:', formData, 'errors', errors);
        props.onSubmit && props.onSubmit({value: form.schema, submitData: formData})
    };

    return (
        <div>
            {/*<Provider
                ref={genRef}
                onChange={data => handleChange(data)}
                onSchemaChange={schema => console.log('schema:change', schema)}
                defaultValue={objData}
                hideId={true}
                extraButtons={[true, false, false, false, false]}
                controlButtons={[false, false]}
                transformer={{
                    from: fromFormily,
                    to: toFormily,
                }}
            >
                <div className="fr-generator-container">
                    <Canvas />
                </div>
            </Provider>*/}
            <FormRender form={form} schema={objData} onFinish={onFinish} />

            {/*<Button type="primary" onClick={handleOk} style={{ marginBottom: 12, position: 'absolute', bottom: 0 }}>*/}
            <Button type="primary" onClick={form.submit} style={{ marginBottom: 12, position: 'absolute', bottom: 0 }}>
                提交
            </Button>
            {/*<Button onClick={goToFrPlayground} style={{ marginBottom: 12, position: 'absolute', bottom: 0 }}>
                返回
            </Button>*/}
        </div>
    );
};

export default Demo;
