+++
date = "2016-06-13T17:47:08-07:00"
draft = false
title = "Refactoring towards Presentational Components in React"
categories = ["react"]
tags = ["react", "javascript", "refactor"]

+++
Since working with React I have notice a frequent change in the way Components are written. I have always ha da preference for writing in the ES6 style component, coming from writing exclusively JavaScript in the Ember framework.

I am currently rewriting some code for the Netlify site and see some low hanging fruit for the use of Presentational Components. 

For those unfamiliar there a few type of Components in React: 

## Container

This is a smart component that understand knowledge of it surroundings, including routing and data. Limiting the scope of the container to handle these things make the rest of the Components more flexible for reuse and presentation.

## Smart Component

This component is aware of its own state and even uses other functions to help out with that task. In addition to presenting props and it also can manipulate it’s own state, which makes things a little more challenging to test and present.

## Presentational/Stateless

This a dumb component that simply presents the data as provided. These components are perfect for reusability and simple to test.

On the Netlify site we offer the ability to upgrade from a free plan in app, nothing out of the ordinary here. This all lives in a SitePlanMenu, which is a Smart Component. 

![plans](/images/refactoring-blog-plans.png)

The code originally was written with the idea of eventually moving towards Presentational components, where each section is abstracted into it’s own function and called in the render method. 

Notice how **renderPlans()** is calling the plan details functions on lines 41–43 and then being rendered in the **render()** function on line 74. 

```js
// Code has been simplified for brevity
  
export default class SitePlanMenu extends Component {
   ...
  planBullets(plan) {
    const {bullets} = plan;
    return (
      bullets.map((bullet, i) => <div className="plan-bullet" key={i}>{bullet}</div>)
    );
  }

  planPrice(plan) {
    return (
      plan.price > 0
      ? <div className="plan-price">{plan.yearly}/month <small>paid yearly</small></div>
      : <div className="plan-price">Free</div>
    );
  }

  selectPlanButton(plan) {
    const {subscribedPlan, onSelection} = this.props;
    const freePlan = subscriptions[0];
    const currentPlan = plan.title.toLowerCase();
    const activePlan = subscribedPlan ? subscribedPlan : freePlan;
    const select = () => onSelection(plan);

    return (
      currentPlan === activePlan
      ? <div className="plan-picked btn btn-inactive"><i className="fa fa-check"></i> Your Current Plan</div>
      : <a onClick={select} className="btn btn-default"><i className="fa fa-plus"></i> Choose This Plan</a>
    );
  }

  renderPlans() {
    return (
      <div className="row">
        {subscriptions.map((plan, i) => (
          <div key={i} className="col-md-3">
            <div className="plan" >
              <div className="plan-title">{plan.title}</div>
              {this.planBullets(plan)}
              {this.planPrice(plan)}
              {this.selectPlanButton(plan)}
            </div>
          </div>
        ))}
      </div>
    );
  }
   render() {
    const {currentSubscription} = this.props;
    const {editing} = this.state;
    return (
      <div className="col-md-12 settings">
        <hgroup>
          <h1 className="page-header no-top-margin">Your Plan</h1>
          <h2>Upgrade or downgrade your netlify plan</h2>
        </hgroup>
        <hr />
        <hgroup>
          <h4>Static Hosting Plan</h4>
          <h5>Pick a static hosting plan for this site. You can pick a specific hosting plan for each of your sites.</h5>
          <p>See the complete feature lists on <a href="https://www.netlify.com/pricing" target="_blank">our pricing page</a></p>
        </hgroup>

        <CurrentHostingPlan
            currentSubscription={currentSubscription}
            editing={editing}
            onEditing={this.handleReplacePaymentMethod}
        />
        {this.paymentMethods()}

        <hr />


        // renderPlans() needs to be refactored

        {this.renderPlans()}



        <hr />
        <div className="row">
          <div className="col-md-12 text-center">
            <a href="https://www.netlify.com/pricing" target="_blank">See the complete feature lists on our pricing page</a>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
```
With each section in their own function, moving to Presentational Components is actually a breeze. I first moved the **renderPlans()** to it’s own component and followed with the nesting the rest inside.

```js
import React from 'react';
import PlanBullets from './PlanBullets';
import PlanPrice from './PlanPrice';
import SelectPlanButton from './SelectPlanButton';
import {hostingSubscriptions as subscriptions} from '../lib/subscriptions.js';

const Plans = ({subscribedPlan, onSelection}) => {
  return (
    <div className="row">
      {subscriptions.map((plan, i) => (
        <div key={i} className="col-md-3">
          <div className="plan" >
            <div className="plan-title">{plan.title}</div>
            <PlanBullets plan={plan} />
            <PlanPrice plan={plan} />
            <SelectPlanButton
                plan={plan}
                subscribedPlane={subscribedPlan}
                subscriptions={subscriptions}
                onSelection={onSelection}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Plans;
```

Finally I deleted all the functions in the Smart Component and present the newly formed **<Plans />** component on line 30. Overall I am now dealing with less lines in my Smart Component. I am also now able to reuse the PlanMenu anywhere else.

```js
import React from 'react';
import CurrentHostingPlan from './CurrentHostingPlan';
import PaymentMethod from '../components/modals/PaymentMethod';
import Plans from './Plans';
export default class SitePlanMenu extends React.Component {
  render() {
    const {currentSubscription, subscribedPlan, onSelection} = this.props;
    const {editing} = this.state;
    return (
      <div className="col-md-12 settings">
        <hgroup>
          <h1 className="page-header no-top-margin">Your Plan</h1>
          <h2>Upgrade or downgrade your netlify plan</h2>
        </hgroup>
        <hr />
        <hgroup>
          <h4>Static Hosting Plan</h4>
          <h5>Pick a static hosting plan for this site. You can pick a specific hosting plan for each of your sites.</h5>
          <p>See the complete feature lists on <a href="https://www.netlify.com/pricing" target="_blank">our pricing page</a></p>
        </hgroup>

        <CurrentHostingPlan
            currentSubscription={currentSubscription}
            editing={editing}
            onEditing={this.handleReplacePaymentMethod}
        />
        {this.paymentMethods()}

        <hr />


        // New Plans Component //

        <Plans subscribedPlan={subscribedPlan} onSelection={onSelection} />


        <hr />
        <div className="row">
          <div className="col-md-12 text-center">
            <a href="https://www.netlify.com/pricing" target="_blank">See the complete feature lists on our pricing page</a>
          </div>
        </div>
        <hr />
      </div>
    );
}
```
