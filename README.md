# Discover Ticketmaster Events

This is a submission for the [Visory engineering challenge](https://github.com/VisoryPlatform/engineering-challenge).

It shows upcoming events sourced from the [Ticketmaster API](https://developer.ticketmaster.com/api-explorer/v2/), and allows filtering by a location and a date range. 

The framework chosen was [Angular](https://angular.io/).

## Prerequisites

* npm: '9.5.0'

## Installation

<code>$ npm install</code> to install package dependencies

## Usage

<code>$ ng test</code> to run unit tests

<code>$ ng serve</code> to run the app, then open your browser to http://localhost:4200/

## Features

* **Automatic filter**. Events are automatically fetched and then reloaded when the user changes the filter.  There is no "Search" button.
* **Infinite scroll**. This is better UX than having to click on a "Next" button for pagination (IMHO).
* **Routes**. Although out of scope for this exercise, it shows how this app would be expanded.  For example, clicking on an event would take you to a new route for that event. 

## Limitations

Due to time constraints, these issues have not been addressed:

* **It's ugly!** It needs more CSS work to improve the UX.  Perhaps a UI library such as Material could be used.
* **Unit tests**. There are some unit tests, but coverage is limited.  I've tested it manually.
* **Country filter**. This should be a droplist.  The Ticketmaster API supports it, and it would be easy to implement.
* **Form Validation**. The filter should not allow historical dates, nor startDateTime > endDateTime.  Any errors should be shown on the form.
* **Other UX issues**:
  * The filter scrolls off the page.  It should remain visible.
  * The "Loading..." indicator should be an animated spinner instead of text.
  * Error notification should be a popup instead of text. 
