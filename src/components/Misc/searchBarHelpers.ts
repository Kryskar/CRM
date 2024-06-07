export const filterSearchBarFn = (data:any, getRadioNameForFiltering:() =>string, searchTerm:string) => { //eslint-disable-line
    const filteredData = data.filter((item:any) => { //eslint-disable-line
        const propertyName = getRadioNameForFiltering();
        const propertyValue = item[propertyName] as string;
        if (propertyValue !== undefined && propertyValue !== null) {
          const stringValue = propertyValue.toString();
          return stringValue.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      })
      return filteredData
}

export const radiosClients = ['name', 'surname', 'phone number', 'requested amount', 'client status'];
export const getRadioNameForFilteringClients = (radioValue:string) => {
    switch (radioValue) {
      case '2':
        return 'surname';
      case '3':
        return 'phoneNumber';
      case '4':
        return 'requestedAmount';
      case '5':
        return 'clientStatus';
      default:
        return 'name';
    }
  };
  