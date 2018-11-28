import React, {
  PureComponent
}                       from 'react';
import PropTypes        from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';
import {
  AnimatedView
}                         from 'components';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as actions           from '../redux/actions';

class PageNotFound extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
      enterPageNotFound: PropTypes.func.isRequired,
      leavePageNotFound: PropTypes.func.isRequired
    })
  };

  componentDidMount() {
    const { 
      actions: {
        enterPageNotFound
      } 
    } =  this.props;
    enterPageNotFound();
  }

  componentWillUnmount() {
    const { 
      actions: {
        leavePageNotFound
      }
    } = this.props;
    leavePageNotFound();
  }

  render() {
    return(      
       <AnimatedView>                           
          <Card className="page-not-found">
            <CardBody> 
                <svg className="icon icon-bug">
                  <use xlinkHref="#icon-bug"></use>
                </svg>                               
                <b className="not-found-text">404</b> 
                <h3 className="card__title"><b>PAGE NOT FOUND</b></h3>                
                <a href="/"><button className="btn btn-back-to-home form-control">Back to Site</button></a>
            </CardBody>
          </Card>                         
      </AnimatedView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentView:  state.views.currentView
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {        
        enterPageNotFound: actions.enterPageNotFound,
        leavePageNotFound: actions.leavePageNotFound,     
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageNotFound);