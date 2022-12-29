import { render, fireEvent } from "@testing-library/react";
import { Collapse } from "../Collapse";
import { faHome } from "@fortawesome/free-solid-svg-icons";

describe("Collapse Component", () => {
    beforeEach(() => {
        Object.defineProperty(HTMLElement.prototype, "scrollHeight", { configurable: true, value: 30 });
        Object.defineProperty(HTMLElement.prototype, "clientHeight", { configurable: true, value: 10 });
    });

    afterEach(()=>{
        // Set these back to undefined to prevent test bleed
        delete (HTMLElement as any).prototype.scrollHeight;
        delete (HTMLElement as any).prototype.clientHeight;
    });

    it("Renders a collapse component", () => {
        const component = render(
            <Collapse
                headerContent='My Collapse'
            >
                <p className="test-element">Hi everyone</p>
            </Collapse>
        );

        const collapseBody = component.container.querySelector<HTMLDivElement>("div.collapse-body");
        expect(collapseBody?.classList.contains("h-0")).toBe(true);
        expect(collapseBody?.style.height).toBe("0px");
        expect(component.container).toMatchSnapshot();
    });

    it("Toggles collapse on click", () => {
        const component = render(
            <Collapse
                headerContent='My Collapse'
            >
                <p className="test-element">Hi everyone</p>
            </Collapse>
        );

        const collapseTitle = component.container.querySelector<HTMLDivElement>("div.collapse-title");
        const collapseBody = component.container.querySelector<HTMLDivElement>("div.collapse-body");
        const chevronWrapper = collapseTitle?.querySelector<HTMLDivElement>("div.items-end");

        // Initial state
        expect(collapseBody?.classList.contains("h-0")).toBe(true);
        expect(collapseBody?.style.height).toBe("0px");
        expect(chevronWrapper?.classList.contains("-rotate-90")).toBe(true);

        // Expand
        fireEvent.click(collapseTitle as HTMLDivElement);
        expect(collapseBody?.classList.contains("h-0")).toBe(false);
        expect(collapseBody?.style.height).toBe("30px");
        expect(chevronWrapper?.classList.contains("-rotate-90")).toBe(false);

        // Collapse
        fireEvent.click(collapseTitle as HTMLDivElement);
        expect(collapseBody?.classList.contains("h-0")).toBe(true);
        expect(collapseBody?.style.height).toBe("0px");
        expect(chevronWrapper?.classList.contains("-rotate-90")).toBe(true);
    });

    it("Toggles collapse on click when defaultExpand is set to true", () => {
        const component = render(
            <Collapse
                defaultExpand={true}
                headerContent='My Collapse'
            >
                <p className="test-element">Hi everyone</p>
            </Collapse>
        );
        const collapseTitle = component.container.querySelector<HTMLDivElement>("div.collapse-title");
        const collapseBody = component.container.querySelector<HTMLDivElement>("div.collapse-body");
        const chevronWrapper = collapseTitle?.querySelector<HTMLDivElement>("div.items-end");

        // Initial state
        expect(collapseBody?.classList.contains("h-0")).toBe(false);
        expect(collapseBody?.style.height).toBe("30px");
        expect(chevronWrapper?.classList.contains("-rotate-90")).toBe(false);

        // Collapse
        fireEvent.click(collapseTitle as HTMLDivElement);
        expect(collapseBody?.classList.contains("h-0")).toBe(true);
        expect(collapseBody?.style.height).toBe("0px");
        expect(chevronWrapper?.classList.contains("-rotate-90")).toBe(true);

        // Expand
        fireEvent.click(collapseTitle as HTMLDivElement);
        expect(collapseBody?.classList.contains("h-0")).toBe(false);
        expect(collapseBody?.style.height).toBe("30px");
        expect(chevronWrapper?.classList.contains("-rotate-90")).toBe(false);
    });

    it("Renders an expanded collapse component when defaultExpand is true", () => {
        const component = render(
            <Collapse
                headerContent='My Collapse'
                defaultExpand={true}
            >
                <p className="test-element">Hi everyone</p>
            </Collapse>
        );
        const collapseBody = component.container.querySelector<HTMLDivElement>("div.collapse-body");

        expect(collapseBody?.classList.contains("h-0")).toBe(false);
        expect(collapseBody?.style.height).toBe("30px");
        expect(component.container).toMatchSnapshot();
    });

    it("Respects className prop", () => {
        const {container} = render(
            <Collapse
                headerContent='My Collapse'
                className='my-class-name'
            >
                <p className="test-element">Hi everyone</p>
            </Collapse>
        );

        const el = container.firstChild as HTMLElement;
        expect(el).toBeInTheDocument();
        expect(el.classList.contains("my-class-name")).toBe(true);
        expect(el).toMatchSnapshot();
    });

    it("Respects headerClasses prop", () => {
        const {container} = render(
            <Collapse
                headerContent='My Collapse'
                headerClasses='some-header-class another-header-class'
            >
                <p className="test-element">Hi everyone</p>
            </Collapse>
        );
        const headerContainer = container.querySelector("div.some-header-class.another-header-class");
        expect(headerContainer).toBeInTheDocument();
        expect(headerContainer).toMatchSnapshot();
    });

    it("Respects leftIcon prop", () => {
        const {container} = render(
            <Collapse
                headerContent='My Collapse'
                leftIcon={faHome}
            >
                <p className="test-element">Hi everyone</p>
            </Collapse>
        );

        const collapseTitleEl = container.querySelector("div.collapse-title");
        expect(collapseTitleEl?.querySelector("svg")).toEqual(collapseTitleEl?.firstElementChild);
        expect(collapseTitleEl).toMatchSnapshot();
    });

    it("Does not render LeftIcon when prop is undefined", () => {
        const {container} = render(
            <Collapse
                headerContent='My Collapse'
            >
                <p className="test-element">Hi everyone</p>
            </Collapse>
        );

        const collapseTitleEl = container.querySelector("div.collapse-title");
        expect(collapseTitleEl?.querySelector("svg")).not.toEqual(collapseTitleEl?.firstElementChild);
        expect(collapseTitleEl).toMatchSnapshot();
    });

    it("Respects leftIconClasses arg", () => {
        const {container} = render(
            <Collapse
                headerContent='My Collapse'
                leftIcon={faHome}
                leftIconClasses='some-icon-class'
            >
                <p className="test-element">Hi everyone</p>
            </Collapse>
        );

        const collapseTitleEl = container.querySelector("div.collapse-title");
        expect(collapseTitleEl?.querySelector("svg.some-icon-class")).toBeInTheDocument();
        expect(collapseTitleEl).toMatchSnapshot();
    });

    it("Respects rightIconClasses arg", () => {
        const {container} = render(
            <Collapse
                headerContent='My Collapse'
                rightIconClasses='some-icon-class'
            >
                <p className="test-element">Hi everyone</p>
            </Collapse>
        );

        const collapseTitleEl = container.querySelector("div.collapse-title");
        const iconEl = collapseTitleEl?.querySelector("svg.some-icon-class");
        expect(iconEl).toBeInTheDocument();
        expect(collapseTitleEl).toMatchSnapshot();
    });
});
