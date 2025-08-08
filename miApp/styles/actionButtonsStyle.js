import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  cardButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D9CDB',
    marginHorizontal: 6,
    paddingVertical: 24,
    borderRadius: 20,
    elevation: 4,
  },
  cardOutlined: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2D9CDB',
  },
  cardLabel: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardLabelOutlined: {
    marginTop: 10,
    fontSize: 16,
    color: '#2D9CDB',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
