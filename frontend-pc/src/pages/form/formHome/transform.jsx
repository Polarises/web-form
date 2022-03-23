import React, { useState, useRef } from 'react';
import Generator from 'fr-generator';
import { Button, Modal, Input } from 'antd';
const { TextArea } = Input;
const { Provider, Sidebar, Canvas, Settings } = Generator;

const defaultValue = {
    "type": "object",
    "properties": {
        "cc": {
            "type": "string",
            "title": "CC",
            "x-component": "input",
            "x-component-props": {
                "min": 1
            },
            "name": "cc",
            "key": "cc"
        },
        "input_9NOeHr": {
            "title": "输入框",
            "type": "string",
            "x-component-props": {},
            "name": "input_9NOeHr",
            "key": "input_9NOeHr"
        },
        "textarea_sCdsJV": {
            "title": "编辑框",
            "type": "string",
            "format": "textarea",
            "x-component-props": {},
            "name": "textarea_sCdsJV",
            "key": "textarea_sCdsJV"
        },
        "number_XP6C2f": {
            "title": "数字输入框",
            "type": "number",
            "name": "number_XP6C2f",
            "key": "number_XP6C2f"
        },
        "switch_kvJf0S": {
            "title": "是否选择",
            "type": "boolean",
            "x-component": "switch",
            "name": "switch_kvJf0S",
            "key": "switch_kvJf0S"
        }
    },
    "labelWidth": 120,
    "displayType": "row"
};

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

const Demo = () => {
    const [show, setShow] = useState(false);
    const [schema, setSchema] = useState(() => defaultValue);
    const genRef = useRef(); // class组件用 React.createRef()

    const toggle = () => setShow(o => !o);

    const handleOk = () => {
        const value = genRef.current && genRef.current.getValue();
        console.log('log valll::', value)
        setSchema(value);
        toggle();
    };

    return (
        <div>
            <Button type="primary" onClick={toggle} style={{ marginBottom: 12 }}>
                配置schema
            </Button>
            <Modal
                visible={show}
                onCancel={toggle}
                onOk={handleOk}
                okText="保存"
                cancelText="关闭"
                width="90%"
                bodyStyle={{ height: '70vh' }}
            >
                {/*<Generator
                    ref={genRef}
                    defaultValue={schema}
                    transformer={{
                        to: fromFormily,
                        from: toFormily,
                    }}
                />*/}
                <Provider
                    ref={genRef}
                    onChange={data => console.log('data:change', data)}
                    onSchemaChange={schema => console.log('schema:change', schema)}
                    defaultValue={defaultValue}
                    hideId={true}
                    // extraButtons={[ { text: '最终展示', onClick: val => this.goToFrPlayground(val) }, false, false, false, false]}
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
                </Provider>
            </Modal>
            {/*<TextArea
                autoSize
                value={JSON.stringify(schema, null, 2)}
                onChange={() => {}}
            />*/}
        </div>
    );
};

export default Demo;
