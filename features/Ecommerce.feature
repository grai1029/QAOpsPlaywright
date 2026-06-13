Feature: Ecommerce Validations 
  @Regression
  Scenario: Placing the Order 
    Given a login to Ecommerce application with "gyanendra.kulung.rai@gmail.com" and "Sitl@651" 
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter vaild details and Place the Order
    Then Verify order is present in OrderHistory

  @Validation
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
      | username                       | password  |
      | gyanendra.kulung.rai@gmail.com | Sitl@651  |
      | def@gmail.con                  | Testing@1 |

