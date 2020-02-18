import { goBack } from 'connected-react-router';
import { shell } from 'electron';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Support from '../components/Support';
import { collectProblemReport, sendProblemReport } from '../lib/problem-report';
import { IReduxState, ReduxDispatch } from '../redux/store';
import supportActions from '../redux/support/actions';

const mapStateToProps = (state: IReduxState) => ({
  defaultEmail: state.support.email,
  defaultMessage: state.support.message,
  accountHistory: state.account.accountHistory,
  isOffline: state.connection.isBlocked,
  outdatedVersion: state.version.currentIsOutdated,
});

const mapDispatchToProps = (dispatch: ReduxDispatch) => {
  const { saveReportForm, clearReportForm } = bindActionCreators(supportActions, dispatch);
  const history = bindActionCreators({ goBack }, dispatch);

  return {
    onClose() {
      history.goBack();
    },
    viewLog(path: string) {
      shell.openItem(path);
    },
    saveReportForm,
    clearReportForm,
    collectProblemReport,
    sendProblemReport,
    onExternalLink: (url: string) => shell.openExternal(url),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Support);
