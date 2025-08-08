import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  background: {
    height,
    width: '100%',
    resizeMode: 'cover', 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  surface: {
    padding: 28,
    borderRadius: 20,
    elevation: 6,
    backgroundColor: '#ffffffdd',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#2D9CDB',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
  },
});