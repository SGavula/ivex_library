import React, { useEffect } from 'react';
/* Utils */
import Heading from '../../../utils/Heading/Heading.util';
import Button from '../../../utils/Button/Button.util';
import { useHistory } from 'react-router-dom';

const FAQ = () => {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant'
		});
	}, []);

	const history = useHistory();

	const handleContactClick = () => {
		history.push('/contact');
	};

	return (
		<div className="faq">
			<div className="container-lg space">
				<div className="heading">
					<Heading title="FAQ" subtitle="all you need to know" />
				</div>

				{/* ÚVOD */}
				<div className="faq-main">
					<div className="uvod col-12 col-md-6">
						{/* Prvý Odstavec */}
						<div className="faq-row">
							<span className="text-normal text-small text-bold">
								Can I try IVEX library for free?
							</span>
							<p className="text-normal text-small text-medium">
								Yes. The service provides a 7-day "Free trial", where full functionality is unlocked. All you have to do is register in the IVEX library and you can read any work. You will not be charged until the end of the trial period. Remember, you can only start with one free trial. Second option is to choose Freemium mode. We will unlock you all Open Access titles.
							</p>
						</div>

						{/* Druhý Odstavec */}
						<div className="faq-row">
							<span className="text-normal text-small text-bold">
								Can I use IVEX library even if I am not an university student?
							</span>
							<p className="text-normal text-small text-medium">
								Of course, the IVEX library is accessible to anyone interested and reading enthusiasts. It doesn't matter if you are a college student or already after school. No one should be limited when it comes to education.
							</p>
						</div>

						{/* Tretí Odstavec */}
						<div className="faq-row">
							<span className="text-normal text-small text-bold">
								How can I quote from an e-book?
							</span>
							<p className="text-normal text-small text-medium">
								It is simple! All you have to do is copy part of the e-book on your computer and the IVEX library will automatically generate a citation link directly from the book. Just copy and paste and you will see the ISO 690 citation standard.
							</p>
						</div>

						{/* Štvrtý Odstavec */}
						<div className="faq-row">
							<span className="text-normal text-small text-bold">
								Does the subscription renew automatically?
							</span>
							<p className="text-normal text-small text-medium">
								Yes. Depending on the type of program, billing renewal is set monthly or semestrally. If you do not wish to continue using the service, you must visit your profile and unsubscribe your program.
							</p>
						</div>

						{/* Piatý Odstavec */}
						<div className="faq-row">
							<span className="text-normal text-small text-bold">
								Do you provide bulk discounts and bulk rates?
							</span>
							<p className="text-normal text-small text-medium">
								Yes! Contact our sales team via email: sales@ivexlibrary.sk.
							</p>
						</div>

						{/* Šiesty Odstavec */}
						<div className="faq-row">
							<span className="text-normal text-small text-bold">
								Can I cancel my subscription at any time?
							</span>
							<p className="text-normal text-small text-medium">
								Yes, but with Semester subscription, the amount is billed for a certain period, which means that the current paid period must end, and then you can decide whether to continue. After you cancel your subscription, your access will be suspended after the selected time has elapsed.
							</p>
						</div>

						{/* Siedmy Odstavec */}
						<div className="faq-row">
							<span className="text-normal text-small text-bold">
								What is the difference between subscription options?
							</span>
							<p className="text-normal text-small text-medium">
								The difference in the subscriptions are mainly in the monthly amount and the method of cancellation of the subscription. With a Semester subscription, monthly financial amount is cheaper. In return, there is a restriction on subscription cancellation.
							</p>
						</div>

						{/* Ôsmy Odstavec */}
						<div className="faq-row">
							<span className="text-normal text-small text-bold">
								Where is the IVEX library available?
							</span>
							<p className="text-normal text-small text-medium">
								IVEX library is available in whole World. You can contact us via socials or send us an email to sales@ivexlibrary.sk and we will try to help you.
							</p>
						</div>

						{/* Deviaty Odstavec */}
						<div className="faq-row">
							<span className="text-normal text-small text-bold">
								Is the IVEX library limited to certain titles?
							</span>
							<p className="text-normal text-small text-medium">
								Not. One of the many goals of the IVEX library is to provide e-books and information to as many readers as possible. The books published on the platform should be made available to all subscribers, without restriction.
							</p>
						</div>

						{/* Desiaty Odstavec */}
						<div className="faq-row">
							<span className="text-normal text-small text-bold">
								How does the IVEX library obtain its e-books?
							</span>
							<p className="text-normal text-small text-medium">
								IVEX library cooperates with publishing institutions. Based on the contracts, the books are distributed on the platform.
							</p>
						</div>

						{/* Jedenásty Odstavec */}
						<div className="faq-row">
							<span className="text-normal text-small text-bold">
								What is the legal basis for the IVEX library?
							</span>
							<p className="text-normal text-small text-medium">
								E-books are subject of Copyright law of the country of readers orgin. User of platform does not have any rights to download, share, derivates or otherwise change the content of title.
							</p>
						</div>

						{/* Dvanásty Odstavec */}
						<div className="faq-row">
							<span className="text-normal text-small text-bold">
								Is it possible for multiple users to browse the same e-book?
							</span>
							<p className="text-normal text-small text-medium">
								Yes, IVEX library does not restrict subscribers to borrow e-books. Multiple readers can view one title at the time.
							</p>
						</div>

						{/* Trinásty Odstavec */}
						<div className="faq-row">
							<span className="text-normal text-small text-bold">
								Is the IVEX Library also available on mobile devices?
							</span>
							<p className="text-normal text-small text-medium">
								Yes, the library is also suitable for browsing on phones, tablets or other portable devices with internet access. The responsive PDF viewer allows you to rotate devices so that you have the best reading experience.
							</p>
						</div>

						{/* Štrnásty Odstavec */}
						<div className="faq-row">
							<span className="text-normal text-small text-bold">
								After activating the subscription, can I read indefinitely?
							</span>
							<p className="text-normal text-small text-medium">
								Yes, IVEX library allows you to re-browse books, without any restrictions.
							</p>
						</div>
					</div>

					{/* MÁTE ĎALŠIE OTÁZKY */}
					<div className="next-questions col-12 col-md-6">
						<h3 className="text-title text-32 text-bold pb-3">
							Do you have any questions?
						</h3>
						<span onClick={handleContactClick}>
							<Button
								type="submit"
								text="Contact support"
								color="yellow"
							/>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FAQ;
