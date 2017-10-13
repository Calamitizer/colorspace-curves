import java.util.*;
import java.lang.Math;
import java.io.FileWriter;
import java.io.IOException;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class Hilbert3Generator {
    private final static int dimen = 3;
    private static int sectors;
    private final int iter;
    private final String filename;
    private final static String filepath = "../hilbert-3d-jsons/";
    private final static int[][] basePath = {
        { 0,  0,  0},
        { 0,  0, +1},
        { 0, +1,  0},
        { 0,  0, -1},
        {+1,  0,  0},
        { 0,  0, +1},
        { 0, -1,  0},
        { 0,  0, -1}
    };
    private final static int[][][] rotations = {
        {
            { 0, +1,  0},
            { 0,  0, +1},
            {+1,  0,  0}
        },
        {
            { 0,  0, +1},
            {+1,  0,  0},
            { 0, +1,  0}
        },
        {
            { 0,  0, +1},
            {+1,  0,  0},
            { 0, +1,  0}
        },
        {
            {+1,  0,  0},
            { 0, -1,  0},
            { 0,  0, -1}
        },
        {
            {+1,  0,  0},
            { 0, -1,  0},
            { 0,  0, -1}
        },
        {
            { 0,  0, -1},
            {-1,  0,  0},
            { 0, +1,  0}
        },
        {
            { 0,  0, -1},
            {-1,  0,  0},
            { 0, +1,  0}
        },
        {
            { 0, -1,  0},
            { 0,  0, +1},
            {-1,  0,  0}
        }
    };
    private int[][][] curves;

    public Hilbert3Generator(int iter) {
        this.sectors = (int) Math.pow(2, this.dimen);
        this.iter = iter;
        this.filename = "h3-" + this.iter + ".json";
        this.curves = new int[this.iter][][];
        this.curves[0] = this.basePath;
        for (int i = 1; i < this.iter; i++) {
            int nextLength = this.curveLength(i + 1);
            int prevLength = this.curveLength(i);
            this.curves[i] = new int[nextLength][this.dimen];
            for (int j = 0; j < this.sectors; j++) {
                this.curves[i][prevLength * j] = this.basePath[j];
                int[][] nextPath = this.transformPath(this.rotations[j], this.curves[i - 1]);
                System.arraycopy(nextPath, 1, this.curves[i], (prevLength * j) + 1, prevLength - 1);
            }
        }
    }

    private int curveLength(int iter) {
        return (int) Math.pow(2, this.dimen * iter);
    }

    private int[] transformStep(int[][] rot, int[] step) {
        int[] newStep = new int[this.dimen];
        for (int i = 0; i < this.dimen; i++) {
            for (int j = 0; j < this.dimen; j++) {
                newStep[i] += rot[i][j] * step[j];
            }
        }
        return newStep;
    }

    private int[][] transformPath(int[][] rot, int[][] path) {
        int[][] newPath = new int[path.length][this.dimen];
        for (int i = 0; i < path.length; i++) {
            newPath[i] = this.transformStep(rot, path[i]);
        }
        return newPath;
    }

    private int[][] sumPath(int[][] path) {
        int[][] newPath = new int[path.length][this.dimen];
        for (int i = 1; i < path.length; i++) {
            for (int j = 0; j < this.dimen; j++) {
                newPath[i][j] = newPath[i - 1][j] + path[i][j];
            }
        }
        return newPath;
    }

    public void write() {
        System.out.println("Writing " + this.filename + "...");
        int[][] curve = this.sumPath(this.curves[this.iter - 1]);
        JSONArray curveJSON = new JSONArray();
        for (int i = 0; i < curve.length; i++) {
            int[] point = curve[i];
            JSONArray pointJSON = new JSONArray();
            for (int j = 0; j < point.length; j++) {
                pointJSON.add(point[j]);
            }
            curveJSON.add(pointJSON);
        }

        try {
            FileWriter file = new FileWriter(this.filepath + this.filename);
            file.write(curveJSON.toJSONString());
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        int iter = 0;
        try {
            iter = Integer.parseInt(args[0]);
        } catch (ArrayIndexOutOfBoundsException aioobe) {
            System.out.println("You must supply the iteration value of the curve to generate.");
            System.exit(1);
        } catch (NumberFormatException nfe) {
            System.out.println("The argument must be an integer.");
            System.exit(1);
        }
        if (iter < 1) {
            System.out.println("The iteration value must be at least 1.");
            System.exit(1);
        }
        Hilbert3Generator h = new Hilbert3Generator(iter);
        h.write();
    }
}
