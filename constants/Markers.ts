type MarkerKey = 'food' | 'entrance' | 'intensive';
type IoniconName = 'fast-food-outline' | 'enter-outline' | 'alert-outline'; // Add more as needed

interface MarkerDetails {
  coordinate: { latitude: number; longitude: number };
  icon: IoniconName;
  label: string;
}

const markers: Record<MarkerKey, MarkerDetails> = {
  food: {
    coordinate: { latitude: 55.86334846324295, longitude: 9.872087239221938 },
    icon: 'fast-food-outline',
    label: 'Food',
  },
  entrance: {
    coordinate: { latitude: 55.863788, longitude: 9.872603 },
    icon: 'enter-outline',
    label: 'Entrance',
  },
  intensive: {
    coordinate: { latitude: 55.86399301386834, longitude: 9.871609634919366 },
    icon: 'alert-outline',
    label: 'Intensive',
  },
};


export default markers;