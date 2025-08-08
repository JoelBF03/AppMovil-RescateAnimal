import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f6fa',
  },
  card: {
    paddingBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  lost: {
    color: '#d63031',
  },
  found: {
    color: '#00b894',
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2d3436',
    marginTop: 8,
  },
  text: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  contactActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  backBtn: {
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 16,
    borderRadius: 10,
  },

  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
    marginTop: -8,
  },
  imageEditable: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 8,
  },
  radioGroup: {
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    marginBottom: 12,
  },
});
