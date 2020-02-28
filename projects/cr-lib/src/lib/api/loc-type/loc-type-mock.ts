import {LocationType} from './loc-type';

export class LocTypeMock {

  /**
   * Generates a mock Location Type instance along with a Mock Category.
   *
   * @param inputId unique for the instance.
   * @param categoryId unique identifier for the Category.
   */
  static createLocType(inputId, categoryId): LocationType {
    return {
      id: inputId,
      name: 'Location Type-' + inputId,
      description: 'Testing',
      category: {
        id: categoryId,
        name: 'Category ' + categoryId,
        description: 'Testing Category-' + categoryId,
        icon: 'bike',
        iconColor: 'purple'
      },
      icon: 'monument'
    };
  }

}
