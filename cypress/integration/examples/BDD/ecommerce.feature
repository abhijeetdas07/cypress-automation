Feature: End to end Ecommerce validation

@Regression
Scenario: Verify Ecommerce product delivery 
Given User visit Ecommerce page
When User login to application
And User add items to cart and checkout
And Validate total price limit
Then User select the country, submit the order and Verify Thank you message

@Smoke
Scenario Outline: Verify Ecommerce product delivery with parameterization
Given User visit Ecommerce page
When User login to application with username and password
| username           | password |
| rahulshettyacademy | learning |
And User add items to cart and checkout
And Validate total price limit
Then User select the country, submit the order and Verify Thank you message
    
