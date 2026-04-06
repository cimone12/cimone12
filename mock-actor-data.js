/**
 * Realistic mock responses that mirror what each Apify actor actually returns.
 * Shapes match the real actor output schemas exactly so the processing
 * pipeline (scorer → normalizer → dedup → rank → output) runs without change.
 */

// ── apify/google-search-scraper ───────────────────────────────────────────
// Each item = one search query result page with organicResults array
export const GOOGLE_RAW = [
  {
    organicResults: [
      { title: 'Buy Life Insurance Online – Best Term Life Quotes 2026 USA', snippet: 'Ready to buy life insurance in the United States? Compare the best term life insurance quotes from top-rated companies. Apply online in minutes. Get coverage from $100k to $5M.', url: 'https://www.policygenius.com/life-insurance/' },
      { title: 'Get a Life Insurance Quote Today | Term Life USA', snippet: 'Looking for life insurance? Get a free life insurance quote in seconds. Compare term life and whole life policies. Serving all 50 US states including Texas, Florida, California.', url: 'https://www.ladder.com/life-insurance-quotes' },
      { title: 'Best Life Insurance Companies 2026 – US News Rankings', snippet: 'We compared the best life insurance policies available for US residents. Whether you need term life insurance or whole life coverage, our experts recommend the top-rated companies to buy from.', url: 'https://money.usnews.com/insurance/life-insurance/best-life-insurance-companies' },
      { title: 'Term Life Insurance Quotes – Apply Online in 10 Minutes', snippet: 'Get term life insurance quotes and apply online. No medical exam required for many policies. Available in all US states. Best rates for non-smokers ages 25–55.', url: 'https://www.bestow.com/life-insurance/' },
      { title: 'How to Buy Life Insurance Online in the US – Step by Step', snippet: 'Want to buy life insurance but not sure where to start? This guide helps US residents compare life insurance quotes, choose between term life and whole life, and apply online.', url: 'https://www.nerdwallet.com/article/insurance/how-to-buy-life-insurance' },
    ],
  },
  {
    organicResults: [
      { title: 'Term Life Insurance Quote – Compare $500k and $1M Coverage', snippet: 'Get a term life insurance quote for $500,000 or $1 million in coverage. Compare rates from Banner Life, Pacific Life, Protective. Best for US residents in Florida, Texas, Georgia.', url: 'https://www.term4sale.com/' },
      { title: 'Apply for Life Insurance USA – No Exam Policies Available', snippet: 'Apply for life insurance online without a medical exam. Coverage available for US residents ages 18–60. Get your term life insurance quote in under 5 minutes. Recommended for families.', url: 'https://www.haven.com/life-insurance-quotes' },
      { title: 'Life Insurance Recommendations – Which Policy Should I Buy?', snippet: 'Not sure which life insurance policy to buy? Our recommendation engine compares term life vs whole life based on your age, state, and coverage needs across all US states.', url: 'https://www.selectquote.com/life-insurance/' },
      { title: 'Best Life Insurance Policy for Families in the United States', snippet: 'Looking for the best life insurance policy for your family? Compare term life insurance quotes from top US companies. Get recommendations based on your state – Texas, California, New York.', url: 'https://www.ethos.com/' },
      { title: 'Life Insurance Quotes Comparison – Buy Term Life in USA 2026', snippet: 'Compare life insurance quotes and buy term life insurance online. US residents can get $250k–$2M coverage. Apply for life insurance today. Recommended for ages 25–55 in any US state.', url: 'https://www.quotacy.com/life-insurance-quotes' },
    ],
  },
  {
    organicResults: [
      { title: 'Get Life Insurance Quote – $1M Coverage California', snippet: 'California residents looking to get a life insurance quote for $1 million in term life coverage. Compare top-rated insurers. Apply online in 10 minutes. No exam for healthy adults.', url: 'https://www.fabric.com/life-insurance' },
      { title: 'Looking for Life Insurance in Texas? Compare Best Rates', snippet: 'Texas residents looking for life insurance can compare the best term life quotes online. Apply for life insurance today and get coverage for your family. Rates starting at $15/month.', url: 'https://www.insurancequotes.com/life/texas' },
      { title: 'Term Life Insurance Recommendation – Florida Residents 2026', snippet: 'Need a term life insurance recommendation in Florida? Compare 20-year and 30-year term policies. Get a life insurance quote from Florida-licensed insurers. Apply now.', url: 'https://www.insurancequotes.com/life/florida' },
    ],
  },
];

// ── trudax/reddit-scraper-lite ────────────────────────────────────────────
// Each item = one Reddit post (dataType: 'post') or comment
export const REDDIT_RAW = [
  // r/personalfinance posts
  { dataType: 'post', title: 'Ready to buy life insurance – 33M non-smoker in Texas, need help choosing between Ladder and Bestow', selftext: 'I am 33 years old living in Texas and I am ready to buy life insurance. I want $750,000 in term life coverage for 30 years. I have been comparing Ladder vs Bestow and cannot decide. Does anyone have recommendations? My wife and I just had our first child so I need to get this done soon. Non-smoker, healthy.', author: 'txdad_33', url: 'https://reddit.com/r/personalfinance/comments/abc001/' },
  { dataType: 'post', title: 'Need life insurance quote – 28F Florida, how do I apply for the best term life policy?', selftext: 'Hi I am 28 years old living in Orlando Florida and looking for life insurance. I want to get a life insurance quote for $500,000 in term life coverage. Should I apply online or go through an agent? My budget is around $30/month. Which companies do you recommend in Florida?', author: 'floridagal_28', url: 'https://reddit.com/r/personalfinance/comments/abc002/' },
  { dataType: 'post', title: 'Which life insurance company should I buy from in New York? 35M looking for $1M term life', selftext: 'I live in New York City and I am 35 years old. I want to buy term life insurance for $1 million in coverage. I have been looking at Haven Life, Ladder, and Fabric. Which life insurance policy do you recommend? I want a 20-year term. My income is around $120k. Non-smoker.', author: 'nyc_finance_35', url: 'https://reddit.com/r/personalfinance/comments/abc003/' },
  { dataType: 'post', title: 'How do I get a term life insurance quote in California without an agent?', selftext: 'I am 29 years old in California. I want to get a life insurance quote and apply online without having to talk to an insurance agent. Looking for $500,000 in term life coverage. Is Bestow or Ladder better for California residents? I am a healthy non-smoker. Need recommendations.', author: 'socal_buyer_29', url: 'https://reddit.com/r/personalfinance/comments/abc004/' },
  { dataType: 'post', title: 'Life insurance recommendation needed – Ohio 45M, whole life vs term life debate', selftext: 'I am 45 years old in Ohio and I need to buy life insurance. My financial advisor recommended whole life but I have been reading that term life is better. I want to get a quote for both and compare. Looking for $500,000 in coverage. Which should I buy in Ohio at my age?', author: 'ohiodad_45m', url: 'https://reddit.com/r/personalfinance/comments/abc005/' },
  // r/LifeInsurance posts
  { dataType: 'post', title: 'Apply for life insurance in Illinois – best no-exam term life options 2026', selftext: 'Looking to apply for life insurance in Illinois. I want a no-exam term life policy for $500k coverage, 20 years. I am 38 years old in Chicago. Which companies offer the best no-exam life insurance quotes? Ready to apply this week. Non-smoker.', author: 'chicago_pro_38', url: 'https://reddit.com/r/LifeInsurance/comments/abc006/' },
  { dataType: 'post', title: 'Best life insurance policy for a family of 4 in Georgia – need $1M recommendation', selftext: 'I am 37 years old in Georgia and I need life insurance to protect my family. We have two kids ages 4 and 6. I want $1 million in term life coverage. Looking for the best life insurance policy for families in Georgia. Which company do you recommend I buy from?', author: 'ga_dad_37', url: 'https://reddit.com/r/LifeInsurance/comments/abc007/' },
  { dataType: 'post', title: 'Switching life insurance in Pennsylvania – current whole life too expensive', selftext: 'I am 47 years old in Pennsylvania and I want to switch my life insurance. Currently paying $300/month for a whole life policy but thinking of switching to a 20-year term life. Can I get a term life insurance quote at 47 without health issues? Looking for $500k coverage in PA. Any recommendations?', author: 'pa_switcher_47', url: 'https://reddit.com/r/LifeInsurance/comments/abc008/' },
  { dataType: 'post', title: 'Need term life insurance quote for two spouses – Arizona, looking to buy this month', selftext: 'My wife and I are both 40 years old in Arizona. We want to buy term life insurance for both of us. Looking to get life insurance quotes and compare. I want 20 years, $500k each. Which life insurance companies do you recommend for couples in Arizona? Ready to apply now.', author: 'az_couple_buy', url: 'https://reddit.com/r/LifeInsurance/comments/abc009/' },
  { dataType: 'post', title: 'First time buying life insurance in Washington State – 31M teacher, need recommendations', selftext: 'I am 31 years old, a teacher in Washington state. Ready to buy life insurance for the first time. I want $500,000 in term life coverage for 30 years. My budget is about $25/month. Which life insurance policy should I apply for? Looking for recommendations from people in Washington.', author: 'wa_teacher_31', url: 'https://reddit.com/r/LifeInsurance/comments/abc010/' },
  // r/Insurance posts
  { dataType: 'post', title: 'Life insurance quotes comparison – Michigan 36M engineer, comparing Ladder vs Banner vs Haven', selftext: 'I am 36 years old in Michigan. I want to buy term life insurance and I am comparing quotes from Ladder, Banner Life, and Haven Life. Looking for $750,000 in 25-year term coverage. I am a non-smoker and in good health. Which life insurance company do you recommend I buy from in Michigan?', author: 'mi_engineer_36m', url: 'https://reddit.com/r/Insurance/comments/abc011/' },
  { dataType: 'post', title: 'How to buy life insurance as a self-employed freelancer in Nevada – need quote recommendations', selftext: 'I am 42 years old, self-employed in Nevada. I need life insurance but I am not sure how self-employment affects my rates. Looking for $500k in term life coverage. Can anyone recommend the best life insurance companies for freelancers in Nevada? I want to get a quote and apply online.', author: 'nv_freelance_42', url: 'https://reddit.com/r/Insurance/comments/abc012/' },
  { dataType: 'post', title: 'Term life insurance for active outdoor person in Colorado – will rock climbing affect my rates?', selftext: 'I am 31 years old in Colorado. I rock climb and hike regularly. I want to buy term life insurance for $500,000. Will my outdoor activities affect my rates when I apply? Looking for recommendations on which life insurance company is best for active people in Colorado. Ready to get a quote.', author: 'co_climber_31', url: 'https://reddit.com/r/Insurance/comments/abc013/' },
  { dataType: 'post', title: 'Best life insurance to buy in Tennessee for 50 year old business owner – $1M coverage', selftext: 'I am a 50 year old business owner in Tennessee. I need to buy life insurance for $1 million in coverage. My business partners want me to get a key man policy but I also want personal term life coverage for my family. Which life insurance companies do you recommend in Tennessee?', author: 'tn_biz_50', url: 'https://reddit.com/r/Insurance/comments/abc014/' },
  { dataType: 'post', title: 'Looking for final expense life insurance in Georgia – 63M, need affordable coverage recommendation', selftext: 'I am 63 years old in Georgia. I want to buy final expense life insurance to cover funeral costs and leave something for my kids. Looking for $25,000 to $50,000 in coverage. Which life insurance company do you recommend for final expense coverage in Georgia? Want to get a quote today.', author: 'ga_senior_63', url: 'https://reddit.com/r/Insurance/comments/abc015/' },
  // r/financialindependence
  { dataType: 'post', title: 'Term life insurance recommendation – 32F Colorado FIRE planning, $1M coverage for income replacement', selftext: 'I am 32 years old in Colorado pursuing FIRE. I need term life insurance to protect my income. I want to get a life insurance quote for $1 million in 30-year term coverage. Looking for recommendations on the best life insurance companies for FIRE folks in the US. Non-smoker, healthy.', author: 'co_fire_32f', url: 'https://reddit.com/r/financialindependence/comments/abc016/' },
  { dataType: 'post', title: 'Buy life insurance before starting business – 34M North Carolina, need $1M term life', selftext: 'I am 34 years old in North Carolina and I am about to quit my job and start a business. I want to buy term life insurance now while I am employed and insurable. Looking for $1 million in 30-year term coverage. Which life insurance company should I apply to in North Carolina?', author: 'nc_entrepreneur_34', url: 'https://reddit.com/r/financialindependence/comments/abc017/' },
];

// ── epctex/quora-scraper ──────────────────────────────────────────────────
// Each item = one Quora question with nested answers array
export const QUORA_RAW = [
  {
    question: 'What is the best term life insurance to buy in Texas in 2026?',
    questionDetails: 'I am looking to buy term life insurance in Texas. I am 35 years old, non-smoker, and want $500,000 to $1 million in coverage. Which life insurance companies do you recommend for Texas residents? I want to apply online and get quotes to compare.',
    author: 'Jennifer_Kyle_TX',
    url: 'https://www.quora.com/What-is-the-best-term-life-insurance-to-buy-in-Texas-2026',
    answers: [
      { content: 'For Texas residents looking to buy term life insurance in 2026, I recommend comparing quotes from Ladder Life, Bestow, and Banner Life. All three offer competitive rates for 30 and 35 year old non-smokers in Texas. You can get a life insurance quote online in under 10 minutes and apply without leaving your house.', author: 'InsuranceAdvisor_TX', url: 'https://www.quora.com/What-is-the-best-term-life-insurance-answer1' },
    ],
  },
  {
    question: 'How do I get life insurance quotes online and compare them in the United States?',
    questionDetails: 'I want to get life insurance quotes online and compare multiple companies. I am in Ohio, 44 years old, looking for whole life or term life insurance. What is the best way to compare life insurance policies in the US? Which websites do you recommend?',
    author: 'Michael_Ohio_44',
    url: 'https://www.quora.com/How-do-I-get-life-insurance-quotes-online-USA',
    answers: [
      { content: 'The best way to compare life insurance quotes online in the United States is to use aggregator sites like PolicyGenius, SelectQuote, or Term4Sale. These let you compare term life and whole life quotes from multiple insurers at once. For Ohio residents I recommend starting with PolicyGenius – they work with top-rated US life insurance companies.', author: 'FinancePro_OH', url: 'https://www.quora.com/How-to-get-life-insurance-quotes-USA-answer1' },
    ],
  },
  {
    question: 'Which life insurance company should I choose in Florida for a 30-year term policy?',
    questionDetails: 'I am a 28 year old woman living in Florida. I want to buy a 30-year term life insurance policy for $500,000 in coverage. Which life insurance company do you recommend in Florida? I am healthy, non-smoker, and want to apply online. What are the best options for Florida residents?',
    author: 'Ashley_FL_28',
    url: 'https://www.quora.com/Best-life-insurance-company-Florida-30-year-term-28-year-old',
    answers: [
      { content: 'For a 28 year old Florida resident looking to buy a 30-year term life insurance policy, I recommend Haven Life (backed by MassMutual), Ladder Life, or Pacific Life. All three offer excellent rates for young non-smoking women in Florida. You can apply online and get your term life insurance quote instantly. Haven Life is especially good for Florida residents in your age range.', author: 'FloridaInsurancePro', url: 'https://www.quora.com/Best-life-insurance-FL-answer1' },
    ],
  },
  {
    question: 'How do I apply for $1 million life insurance online in New York?',
    questionDetails: 'I am 35 years old in New York. I want to apply for $1 million in life insurance coverage online. I am looking for a 20-year term life policy. Which companies offer the best life insurance quotes for New York residents? Is there a no-exam option for $1M coverage in NY?',
    author: 'DavidWilson_NYC',
    url: 'https://www.quora.com/How-apply-for-1-million-life-insurance-online-New-York',
    answers: [
      { content: 'Yes, you can apply for $1 million in term life insurance online in New York. Companies like Ladder Life, Haven Life, and Bestow all offer $1M coverage with online applications for New York residents. For a 35 year old non-smoker in New York, $1M in 20-year term life coverage should run around $50-70/month. I recommend getting quotes from all three and comparing.', author: 'NYLifeExpert', url: 'https://www.quora.com/1M-life-insurance-NY-answer1' },
    ],
  },
  {
    question: 'What are the best life insurance options for a 29 year old in California in 2026?',
    questionDetails: 'I am 29 years old living in California. I want to buy life insurance but I am overwhelmed by the options. Should I get term life or whole life? Which companies offer the best life insurance quotes for California residents? I want to apply online and get coverage quickly.',
    author: 'SarahM_California',
    url: 'https://www.quora.com/Best-life-insurance-options-29-year-old-California-2026',
    answers: [
      { content: 'At 29 in California, term life insurance is almost certainly your best buy. A 30-year term life policy for $500,000-$1,000,000 will give you coverage through your peak earning years at a very low monthly premium. I recommend Bestow or Ladder for California residents – both let you apply online and get a life insurance quote instantly without an agent.', author: 'CA_FinancePlanner', url: 'https://www.quora.com/Life-insurance-CA-29-answer1' },
    ],
  },
  {
    question: 'How do I choose between term life and universal life insurance in Michigan?',
    questionDetails: 'I am 36 years old in Michigan and ready to buy life insurance. I have narrowed it down to term life vs universal life insurance. I want $750,000 in coverage. Which is better to buy in Michigan at my age? My goal is to protect my family if something happens to me.',
    author: 'JamesK_Michigan',
    url: 'https://www.quora.com/Term-life-vs-universal-life-insurance-Michigan-36-years-old',
    answers: [],
  },
  {
    question: 'Which whole life insurance policy is worth buying in Pennsylvania for long-term savings?',
    questionDetails: 'I am 48 years old in Pennsylvania and I want to buy whole life insurance for both protection and savings. I am looking for a reputable whole life insurance company that serves Pennsylvania residents. Which life insurance policy do you recommend for someone my age who wants the cash value component?',
    author: 'ThomasD_PA',
    url: 'https://www.quora.com/Best-whole-life-insurance-Pennsylvania-long-term-savings-48',
    answers: [
      { content: 'For a 48 year old in Pennsylvania looking to buy whole life insurance, I recommend Northwestern Mutual, MassMutual, or New York Life. All three offer strong whole life policies with solid cash value growth. Get quotes from all three before deciding. At 48 in Pennsylvania, whole life premiums will be higher but the lifelong coverage and savings component can be worth it depending on your estate planning goals.', author: 'PA_WealthAdvisor', url: 'https://www.quora.com/Whole-life-PA-answer1' },
    ],
  },
  {
    question: 'Need to get life insurance quote in Arizona – best term life for a young couple 2026?',
    questionDetails: 'My husband and I are both 27 years old living in Arizona. We want to buy term life insurance together. Should we get joint or separate policies? We want to get life insurance quotes and compare costs. Looking for $500,000 each in coverage. What is the best life insurance for young couples in Arizona?',
    author: 'AmandaS_Arizona',
    url: 'https://www.quora.com/Best-term-life-insurance-young-couple-Arizona-2026',
    answers: [
      { content: 'For a young couple in Arizona both age 27, I strongly recommend separate term life insurance policies rather than a joint policy. Separate policies give each spouse independent coverage and are usually cheaper in the long run. To get life insurance quotes in Arizona, try PolicyGenius, Ladder, or Bestow. At 27 non-smokers in Arizona, $500k in 30-year term life coverage should cost $20-25/month each.', author: 'AZ_InsurancePro', url: 'https://www.quora.com/Young-couple-AZ-life-insurance-answer1' },
    ],
  },
  {
    question: 'Ready to apply for life insurance in North Carolina – best online options for 33 year old?',
    questionDetails: 'I am 33 years old in North Carolina. I just got married and we are expecting our first child. I am ready to apply for life insurance and want to do it online. Which life insurance company should I apply to in North Carolina? Looking for $750,000 to $1M in 30-year term coverage.',
    author: 'NCDad_33',
    url: 'https://www.quora.com/Apply-life-insurance-North-Carolina-33-year-old-online',
    answers: [
      { content: 'Congratulations on getting married and the new baby! For a 33 year old in North Carolina ready to apply for life insurance, I recommend Haven Life or Ladder. Both let you buy term life insurance online in North Carolina without an in-person exam if you are healthy. For $1M in 30-year term coverage in NC at age 33, expect around $45-60/month as a non-smoker.', author: 'NC_LifeExpert', url: 'https://www.quora.com/Life-insurance-NC-answer1' },
    ],
  },
  {
    question: 'What is the best final expense life insurance to buy in Georgia for a 63 year old?',
    questionDetails: 'I am 63 years old in Georgia and I want to buy final expense life insurance. I do not need a large policy, just enough to cover funeral expenses and leave a little for my children. Which final expense life insurance company do you recommend in Georgia? I want to get a quote and apply quickly.',
    author: 'RobertJ_Georgia',
    url: 'https://www.quora.com/Best-final-expense-life-insurance-Georgia-63-year-old',
    answers: [
      { content: 'For a 63 year old in Georgia looking to buy final expense life insurance, I recommend Mutual of Omaha, AARP/New York Life, or Foresters Financial. All three offer final expense life insurance policies for Georgia seniors with guaranteed issue options (no medical exam). Coverage amounts of $10,000 to $50,000 are typical. Get a quote from Mutual of Omaha first – they have strong rates in Georgia.', author: 'GA_SeniorInsurance', url: 'https://www.quora.com/Final-expense-GA-answer1' },
    ],
  },
];
