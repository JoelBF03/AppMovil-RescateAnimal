import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  background: {
    height,
    width: '100%',
    resizeMode: 'cover',
    flex: 1,
  },
  surface: {
    borderRadius: 20,
    elevation: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginTop: 40,
    marginBottom: 40,
  },
  inner: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2d3436',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#f0f3f5',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#3498db',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 30,
    elevation: 3,
  },
  logoutButton: {
    marginTop: 24,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: '#e74c3c',
    elevation: 3,
  },
  logoutLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
