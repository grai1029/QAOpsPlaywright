Feature: Ecommerce Validations
    @Validation
    Scenario Outline: Placing the Order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username      | password  |
            | gyanendra.kulung.rai@gmail.com| Sitl@651 |
            | def@gmail.con | Testing@1 |