function mapDispatchToProps(dispatch) {
  return {
    checkActions: bindActionCreators(checkActions, dispatch),
    statsActions: bindActionCreators(statsActions, dispatch),
    settingsActions: bindActionCreators(settingsActions, dispatch)
  }
}
