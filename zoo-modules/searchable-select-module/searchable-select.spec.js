describe('Zoo searchable select', function() {
	describe('Searchable Select', () => {
		it('should create searchable select', async() => {
			const createdElements = await page.evaluate(() => {
				let select = document.createElement('zoo-searchable-select');
				select.infotext = 'info-text';
				select.valid = false;
				select.labeltext = 'label-text';
				select.inputerrormsg = 'errormsg';
				select.linktext = 'link-text';
				select.linkhref = 'https://google.com';
				select.linktarget = '#';
				
				document.body.appendChild(select);

				const nestedInput = select.shadowRoot.querySelector('zoo-input').shadowRoot;

				const link = nestedInput.querySelector('.input-link').shadowRoot;
				const linkAnchor = link.querySelector('a');
				const createdLink = {
					linkText: linkAnchor.querySelector('span').innerHTML,
					linkTarget: linkAnchor.getAttribute('target'),
					linkHref: linkAnchor.getAttribute('href')
				};

				const info = nestedInput.querySelector('.input-info').shadowRoot;
				const createdInfo = {
					infoText: info.querySelector('.info-text').innerHTML,
					errorMsg: info.querySelector('.error-label').innerHTML
				};

				const label = nestedInput.querySelector('.input-label').shadowRoot;
				const createdLabel = {
					labelText: label.querySelector('span').innerHTML,
					errorClassPresent: label.querySelector('.label').classList.contains('error')
				};
				return {
					link: createdLink,
					info: createdInfo,
					label: createdLabel
				};
			});
			const link = createdElements.link;
			expect(link.linkText).equal('link-text');
			expect(link.linkHref).equal('https://google.com');
			expect(link.linkTarget).equal('#');

			const label = createdElements.label;
			expect(label.labelText).equal('label-text');
			expect(label.errorClassPresent).to.be.true;

			const info = createdElements.info;
			expect(info.infoText).equal('info-text');
			expect(info.errorMsg).equal('errormsg');
		});

		it('should accept 1 slot', async() => {
			const slottedElement = await page.evaluate(() => {
				let select = document.createElement('zoo-searchable-select');
				let element = document.createElement('select');

				let option = document.createElement('option');
				option.value = 1;
				option.innerHTML = 'first';
				element.appendChild(option);
				element.slot = 'selectelement';

				select.appendChild(element);
				document.body.appendChild(select);
				const slot = select.shadowRoot.querySelector('slot');
				return {
					optVal: slot.assignedNodes()[0].options[0].value,
					optText: slot.assignedNodes()[0].options[0].innerHTML
				}
			});
			expect(slottedElement.optVal).equal('1');
			expect(slottedElement.optText).equal('first');
		});

		it('should handle input typing', async() => {
			const optionDisplayProp = await page.evaluate(async() => {
				let select = document.createElement('zoo-searchable-select');
				let element = document.createElement('select');
				element.multiple = true;

				let option = document.createElement('option');
				option.value = 1;
				option.text = 'first';
				element.appendChild(option);
				element.slot = 'selectelement';

				select.appendChild(element);
				document.body.appendChild(select);

				// so... here we let browser to do its work related to init of slots, custom element and so on.
				// while browser is at it we schedule a micro-task with setTimeout to check what we need to check
				// after all main tasks have finished.
				await new Promise(r => setTimeout(r, 10));
				const slottedInput = select.shadowRoot.querySelector('input');
				slottedInput.focus();
				slottedInput.value = 'sec';
				slottedInput.dispatchEvent(new Event('input', {bubbles: true}));
				return option.style.display;
			});
			expect(optionDisplayProp).equal('none');
		});
	});
});