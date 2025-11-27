# Shahrier's Portfolio

The portfolio website of Shahrier, showcasing projects, skills, and contact information.

Please do this these steps by step and first think create task and todos and then complete the task systematically.

- So this project is about a laravel react intertia project to control frontend pages like a cms through the dashboard so dashboard pages are already created to control most of the frontend pages but still there are many frontend pages sections and components that are not yet controlled by the dashboard so the task is to make those pages sections and components controllable from the dashboard so that non technical users can also control those pages sections and components from the dashboard without touching any code.

Let me give you a clear picture so the frontend aboutme page has all these components:
      <Navbar />
      <Banner pageContent={pageContent} />
      <Report pageContent={pageContent} />
      <Awards awards={awards} />
      <Story section={storySection} />
      <Impact section={impactSection} />
      <Travel section={travelSection} />
      <Corporate pageContent={pageContent} corporateJourney={corporateJourney} />
      <Associate pageContent={pageContent} associates={associates} />
Rigth so we may now have dashboard pages and settings to control Awards and Banner but the rest of the components mainly the Travel and Corporate sections are not yet controllable from the dashboard so the task is to make those components controllable from the dashboard by creating necessary dashboard pages and settings and linking them to the frontend components so that non technical users can also control those components from the dashboard without touching any code.

So, your job is to study the whole frontend aboutme page components and figure out which components are not yet controllable from the dashboard then create necessary dashboard pages and settings to control those components from the dashboard then link those dashboard pages and settings to the respective frontend components so that non technical users can also control those components from the dashboard without touching any code.

All like a CMS but we should not control colors we should control texts, images and if the texts are in like a list then we should be able to add remove and reorder the list items from the dashboard all using shadcn-ui components for the dashboard UI.
