import { useState, useEffect, ChangeEvent } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

import { ComponentToRenderProps } from '@/types/EditorTypes/ComponentTypes';
import { AppModeEnum } from '@/types/EditorTypes/AppTypes';

export const TextArea = function TextArea({
  height,
  properties,
  styles,
  setExposedVariable,
  registerAction,
  dataCy,
  componentDefinitionChanged,
  id,
  mode,
  containerProps,
}: ComponentToRenderProps) {
  const [value, setValue] = useState(properties.value);
  useEffect(() => {
    setValue(properties.value);
    setExposedVariable('value', properties.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties.value]);

  registerAction(
    'setText',
    async function (text) {
      setValue(text ?? '');
      setExposedVariable('value', text);
    },
    [setValue]
  );
  registerAction(
    'clear',
    async function () {
      setValue('');
      setExposedVariable('value', '');
    },
    [setValue]
  );

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (properties.twoWayBinding && mode === AppModeEnum.edit) {
      const currentPage = containerProps.currentPageId;
      const currentFullComponent = { ...cloneDeep(containerProps.appDefinition.pages[currentPage].components[id]) };
      set(currentFullComponent, `component.definition.properties.value.value`, e.target.value);
      componentDefinitionChanged?.({ ...currentFullComponent, id });
    }
    setValue(e.target.value);
    setExposedVariable('value', e.target.value);
  };

  return (
    <textarea
      disabled={styles.disabledState}
      onChange={handleOnChange}
      className="form-control textarea"
      placeholder={properties.placeholder}
      style={{
        height,
        resize: 'none',
        display: styles.visibility ? '' : 'none',
        borderRadius: `${styles.borderRadius}px`,
        boxShadow: styles.boxShadow,
      }}
      value={value}
      data-cy={dataCy}
    ></textarea>
  );
};
