public class App2 {
    public static void main(String[] args) {
        
    }
}

abstract class Shape {

    protected String colors;
    abstract String getColor();
    abstract void setColor(String color);
    abstract double getArea();
    abstract double getPerimeter();

}

class Point {
    private float x;
    private float y;
    public Point(float x, float y) {
        this.x = x;
        this.y = y;
    }
    public float getX() {
        return x;
    }
    public float getY() {
        return y;
    }
    public void setX(float x) {
        this.x = x;
    }
    public void setY(float y) {
        this.y = y;
    }
} 

class Rectangle extends Shape {

    @SuppressWarnings("unused")
    private Point topLeft;
    private double width;
    private double height;
    private String Color;

    public Rectangle(Point topLeft, double width, double height, String color){
        this.topLeft = topLeft;
        this.width = width;
        this.height = height;
        this.colors = color;
    }

    public double getWidth() {
        return width;
    }
    public double getHeight() {
        return height;
    }
    public void setWidth(double width) {
        this.width = width;
    }
    public void setHeight(double height) {
        this.height = height;
    }
    @Override
    public double getArea() {
        return width * height;
    }
    @Override
    public double getPerimeter() {
        return 2 * width + 2 * height;
    }
    @Override
    public void setColor(String color) {
        Color = color;
    }
    @Override
    public String getColor() {
        return Color;
    }

}

class Circle extends Shape {

    @SuppressWarnings("unused")
    private Point center;
    private double radius;
    private String Color;

    public Circle (Point center, double radius, String color) {
        this.center = center;
        this.radius = radius;
        this.colors = color;
    }

    public double getRadius() {
        return radius;
    }
    public void setRadius(double Radius) {
        radius = Radius;
    }

    @Override
    public void setColor(String color) {
        Color = color;
    }
    @Override
    public String getColor() {
        return Color;
    }
    @Override
    public double getArea() {
        return Math.PI * Math.pow(radius, 2);
    }
    @Override
    public double getPerimeter() {
        return 2 * Math.PI * radius;
    }

}

class Polygon extends Shape {

    @SuppressWarnings("unused")
    private Point[] points;
    private String Color;

    public Polygon(Point[] Points, String color) {
        this.points = Points;
        this.colors = Color;
    }

    // public void addPoint(Point point) {

    //}

    //public void getPoints() {
        
    //}*/

    @Override
    public void setColor(String color) {
        Color = color;
    }
    @Override
    public String getColor() {
        return Color;
    }
    @Override
    public double getArea() {
        return 0.0;
    }
    @Override
    public double getPerimeter() {
        return 0.0;
    }

}