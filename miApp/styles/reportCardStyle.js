import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const CARD_WIDTH = isWeb ? 1080 : width * 0.9;
const IMAGE_HEIGHT = isWeb ? 750 : 350;

export default StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    marginBottom: 16,
    width: CARD_WIDTH,
  },

  content: {
    padding: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    color: '#2d3436',
  },

  status: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    color: '#fff',
    marginBottom: 8,
  },

  lost: {
    backgroundColor: '#e74c3c',
  },

  found: {
    backgroundColor: '#27ae60',
  },

  image: {
    width: '100%',
    height: IMAGE_HEIGHT,
    borderRadius: 0,
    backgroundColor: '#ccc',
  },

  subtitle: {
    fontSize: 13,
    color: '#636e72',
    marginBottom: 4,
  },
});
