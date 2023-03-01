export const properties: any = {
    padding: 'padding',
    margin: 'margin',
    color: 'color',
    background: 'background-color',
    position: 'position',
    fontSize: 'font-size',
    display: 'display',

    alignItems: 'align-items',
    justifyContent: 'justify-content',
    direction: 'flex-direction',

    gap: 'gap',
    columns: 'grid-template-columns',
    rows: 'grid-template-rows',
    alignContent: 'align-content',
    justifyItems: 'justify-items',
    placeContent: 'place-content',

    width: 'width',
    height: 'height',
};

export const addStyles = (props: any) => {
    return Object.keys(props)
        .map((key) => {
            const keys = { prop: properties[key], value: props[key] };
            if (keys.prop) {
                return `${keys.prop}: ${
                    props.theme[keys.value] || keys.value
                };`;
            } else {
                return '';
            }
        })
        .join('\n');
};
