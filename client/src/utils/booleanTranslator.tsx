const booleanTranslator = (value: unknown): string => {
    if (typeof value === 'boolean') {
      return value ? 'دارد' : 'ندارد';
    }
    return String(value);
  };

  export default booleanTranslator