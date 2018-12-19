# Input module

## API
- `labelposition` `optional` - accepts following values: `top`, `left`. Default is `top`;
- `labeltext` `optional` - text to be presented as the label of the input;
- `linktext` `optional` - what text to present as a link text,
- `linkhref` `optional` - where the link should lead,
- `linktarget` `optional` - target of the anchor link, default is `about:blank`,
- `inputerrormsg` `optional` - error message to be presented when input is in invalid state,
- `infotext` `optional` - text to be presented below the input;
- `valid` - flag which indicates whether the input is valid or not;

### Example usage 
```
<zoo-log-input labeltext="Very long label which should test how it behaves Label" 
	linktext="Forgotten your password?"
	linkhref="https://google.com"
	linktarget="about:blank"
	valid="{false}"
	infotext="Additional helpful information for our users" >
	<input slot="inputelement" type="number" placeholder="input" class:error="true"/>
</zoo-log-input>
```

### Icons
Requires the following icons: `icon-info-rounded-circle` (`\EA4C`), `icon-error-triangle` (`\EA37`). 