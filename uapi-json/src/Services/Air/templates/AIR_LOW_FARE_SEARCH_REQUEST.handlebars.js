module.exports = `
<!--Release 33-->
<!--Version Dated as of 14/Aug/2015 18:47:44-->
<!--Air Low Fare Search For Galileo({{provider}}) Request-->
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        {{#if async}}
        <air:LowFareSearchAsynchReq
            AuthorizedBy="user" TraceId="mastermind" TargetBranch="{{TargetBranch}}"
            ReturnUpsellFare="true"
            xmlns:air="http://www.travelport.com/schema/air_v47_0"
            xmlns:com="http://www.travelport.com/schema/common_v47_0"
            >
        {{else}}
        <air:LowFareSearchReq
            AuthorizedBy="user" TraceId="mastermind" TargetBranch="{{TargetBranch}}"
            ReturnUpsellFare="true"
            {{#if solutionResult}}
            SolutionResult="true"
            {{/if}}
            xmlns:air="http://www.travelport.com/schema/air_v47_0"
            xmlns:com="http://www.travelport.com/schema/common_v47_0"
            >
        {{/if}}
            <com:BillingPointOfSaleInfo OriginApplication="uAPI"/>
            {{#legs}}
            <air:SearchAirLeg>
                <air:SearchOrigin>
                    <com:CityOrAirport Code="{{from}}" PreferCity="true"/>
                </air:SearchOrigin>
                <air:SearchDestination>
                    <com:CityOrAirport Code="{{to}}" PreferCity="true"/>
                </air:SearchDestination>
                <air:SearchDepTime PreferredTime="{{departureDate}}"/>
                
                {{#if ../permittedConnectionPoints}}

                <air:AirLegModifiers>
                    {{#*inline "connectionPoint"}}
                      <com:ConnectionPoint>
                        <com:CityOrAirport Code="{{connection}}" />
                      </com:ConnectionPoint>
                    {{/inline}}

                    {{#if ../permittedConnectionPoints}}
                    <air:PermittedConnectionPoints>
                    {{#each ../permittedConnectionPoints as |connection|}}
                      {{> connectionPoint connection=connection}}
                    {{/each}}
                    </air:PermittedConnectionPoints>
                    {{/if}}

                    {{#if ../prohibitedConnectionPoints}}
                    <air:ProhibitedConnectionPoints>
                    {{#each ../prohibitedConnectionPoints as |connection| }}
                      {{> connectionPoint connection=connection}}
                    {{/each}}
                    </air:ProhibitedConnectionPoints>
                    {{/if}}

                    {{#if ../preferredConnectionPoints}}
                    <air:PreferredConnectionPoints>
                    {{#each ../preferredConnectionPoints as |connection|}}
                      {{> connectionPoint connection=connection}}
                    {{/each}}
                    </air:PreferredConnectionPoints>
                    {{/if}}
                    </air:AirLegModifiers>
                    {{/if}}
            </air:SearchAirLeg>
            {{/legs}}
            <air:AirSearchModifiers
                {{#if maxJourneyTime}}
                    MaxJourneyTime="{{maxJourneyTime}}"
                {{/if}}
                {{#if maxSolutions}}
                    MaxSolutions="{{maxSolutions}}"
                {{/if}}
            >
                <air:PreferredProviders>
                    <com:Provider Code="{{provider}}" xmlns:com="http://www.travelport.com/schema/common_v47_0"/>
                </air:PreferredProviders>

                {{#if permittedCarriers}}
                <air:PermittedCarriers>
                    {{#each permittedCarriers as |carrier|}}
                    <com:Carrier Code="{{carrier}}" xmlns:com="http://www.travelport.com/schema/common_v47_0"/>
                    {{/each}}
                </air:PermittedCarriers>
                {{/if}}

                {{#if preferredCarriers}}
                <air:PreferredCarriers>
                    {{#each preferredCarriers as |carrier|}}
                    <com:Carrier Code="{{carrier}}" xmlns:com="http://www.travelport.com/schema/common_v47_0"/>
                    {{/each}}
                </air:PreferredCarriers>
                {{/if}}
                {{#if isCabin}}
                    <air:PreferredCabins>
                        <com:CabinClass Type="{{isCabin}}"/>
                    </air:PreferredCabins>
                {{/if}}
            </air:AirSearchModifiers>
            {{#passengers}}
            <com:SearchPassenger 
                BookingTravelerRef="mastermind_{{UUniqueID}}" 
                Code="{{ageCategory}}"
                {{#if child}} Age="9"{{/if}} 
                {{#if infantWOS}} Age="1"{{/if}} 
                {{#if infantWS}} Age="1"{{/if}} 
                xmlns:com="http://www.travelport.com/schema/common_v47_0"/>
            {{/passengers}}
            {{#if pricing}}
            <air:AirPricingModifiers
                FaresIndicator = "PublicFaresOnly"
                {{#if AgentCurrency}}
                    CurrencyType="{{AgentCurrency}}"
                {{/if}}

                {{#if pricing.eTicketability}}
                ETicketability="{{pricing.eTicketability}}"
                {{/if}}
            />
            {{/if}}
            {{#if emulatePcc}}
            <air:PCC>
                <com:OverridePCC ProviderCode="{{provider}}" PseudoCityCode="{{emulatePcc}}"/>
            </air:PCC>
            {{/if}}

        {{#if async}}
        </air:LowFareSearchAsynchReq>
        {{else}}
        </air:LowFareSearchReq>
        {{/if}}
    </soap:Body>
</soap:Envelope>
`;